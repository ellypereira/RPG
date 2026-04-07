const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/', async (req, res) => {
  try {
    const { jogador_id, inimigo_id } = req.body;

    if (!jogador_id || !inimigo_id) {
      return res.status(400).json({
        erro: 'jogador_id e inimigo_id são obrigatórios'
      });
    }

    const [jogadores] = await db.query(
      'SELECT * FROM jogadores WHERE id = ?',
      [jogador_id]
    );

    if (jogadores.length === 0) {
      return res.status(404).json({ erro: 'Jogador não encontrado' });
    }

    const [inimigos] = await db.query(
      'SELECT * FROM inimigos WHERE id = ?',
      [inimigo_id]
    );

    if (inimigos.length === 0) {
      return res.status(404).json({ erro: 'Inimigo não encontrado' });
    }

    const jogador = jogadores[0];
    const inimigo = inimigos[0];

    let vidaJogador = jogador.vida;
    let vidaInimigo = inimigo.vida;

    const danoJogador = Math.max(jogador.ataque - inimigo.defesa, 1);
    const danoInimigo = Math.max(inimigo.ataque - jogador.defesa, 1);

    while (vidaJogador > 0 && vidaInimigo > 0) {
      vidaInimigo -= danoJogador;

      if (vidaInimigo <= 0) {
        break;
      }

      vidaJogador -= danoInimigo;
    }

    const resultado = vidaJogador > 0 ? 'vitória' : 'derrota';

    await db.query(`
      INSERT INTO batalhas (jogador_id, inimigo_id, resultado)
      VALUES (?, ?, ?)
    `, [jogador_id, inimigo_id, resultado]);

    let xp_ganho = 0;
    let nivel_atual = jogador.nivel;
    let subiu_nivel = false;

    if (resultado === 'vitória') {
      xp_ganho = inimigo.xp_recompensa;
      let novoXp = jogador.xp + xp_ganho;
      let novoNivel = jogador.nivel;
      let novoAtaque = jogador.ataque;
      let novaDefesa = jogador.defesa;
      let novaVida = jogador.vida;

      const xpNecessario = jogador.nivel * 50;

      if (novoXp >= xpNecessario) {
        novoNivel += 1;
        novoAtaque += 5;
        novaDefesa += 3;
        novaVida += 10;
        subiu_nivel = true;
      }

      await db.query(`
        UPDATE jogadores
        SET xp = ?, nivel = ?, ataque = ?, defesa = ?, vida = ?
        WHERE id = ?
      `, [
        novoXp,
        novoNivel,
        novoAtaque,
        novaDefesa,
        novaVida,
        jogador_id
      ]);

      nivel_atual = novoNivel;
    }

    res.json({
      mensagem: 'Batalha concluída com sucesso',
      resultado,
      dano_jogador: danoJogador,
      dano_inimigo: danoInimigo,
      vida_final_jogador: Math.max(vidaJogador, 0),
      vida_final_inimigo: Math.max(vidaInimigo, 0),
      xp_ganho,
      nivel_atual,
      subiu_nivel
    });
  } catch (error) {
    console.error('Erro ao processar batalha:', error);
    res.status(500).json({ erro: 'Erro ao processar batalha' });
  }
});

module.exports = router;