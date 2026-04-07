const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', async (req, res) => {
  try {
    const [jogadores] = await db.query(`
      SELECT 
        j.id,
        j.nome,
        j.classe_id,
        c.nome AS classe,
        j.nivel,
        j.xp,
        j.vida,
        j.ataque,
        j.defesa
      FROM jogadores j
      INNER JOIN classes c ON j.classe_id = c.id
      ORDER BY j.id
    `);

    res.json(jogadores);
  } catch (error) {
    console.error('Erro ao buscar jogadores:', error);
    res.status(500).json({ erro: 'Erro ao buscar jogadores' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [jogadores] = await db.query(`
      SELECT 
        j.id,
        j.nome,
        j.classe_id,
        c.nome AS classe,
        j.nivel,
        j.xp,
        j.vida,
        j.ataque,
        j.defesa
      FROM jogadores j
      INNER JOIN classes c ON j.classe_id = c.id
      WHERE j.id = ?
    `, [id]);

    if (jogadores.length === 0) {
      return res.status(404).json({ erro: 'Jogador não encontrado' });
    }

    res.json(jogadores[0]);
  } catch (error) {
    console.error('Erro ao buscar jogador:', error);
    res.status(500).json({ erro: 'Erro ao buscar jogador' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { nome, classe_id } = req.body;

    if (!nome || !classe_id) {
      return res.status(400).json({ erro: 'Nome e classe_id são obrigatórios' });
    }

    const [classes] = await db.query(
      'SELECT * FROM classes WHERE id = ?',
      [classe_id]
    );

    if (classes.length === 0) {
      return res.status(404).json({ erro: 'Classe não encontrada' });
    }

    const classe = classes[0];

    const [resultado] = await db.query(`
      INSERT INTO jogadores (nome, classe_id, nivel, xp, vida, ataque, defesa)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [
      nome,
      classe_id,
      1,
      0,
      classe.vida_base,
      classe.ataque_base,
      classe.defesa_base
    ]);

    res.status(201).json({
      mensagem: 'Jogador criado com sucesso',
      id: resultado.insertId
    });
  } catch (error) {
    console.error('Erro ao criar jogador:', error);
    res.status(500).json({ erro: 'Erro ao criar jogador' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [resultado] = await db.query(
      'DELETE FROM jogadores WHERE id = ?',
      [id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ erro: 'Jogador não encontrado' });
    }

    res.json({ mensagem: 'Jogador deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar jogador:', error);
    res.status(500).json({ erro: 'Erro ao deletar jogador' });
  }
});

module.exports = router;