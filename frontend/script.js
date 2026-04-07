const API = 'http://localhost:3000';

async function carregarClasses() {
  try {
    const resposta = await fetch(`${API}/classes`);
    const classes = await resposta.json();

    const select = document.getElementById('classe');
    select.innerHTML = '';

    classes.forEach(classe => {
      select.innerHTML += `
        <option value="${classe.id}">
          ${classe.nome}
        </option>
      `;
    });
  } catch (error) {
    console.error('Erro ao carregar classes:', error);
  }
}

async function carregarInimigos() {
  try {
    const resposta = await fetch(`${API}/inimigos`);
    const inimigos = await resposta.json();

    const select = document.getElementById('inimigo');
    select.innerHTML = '';

    inimigos.forEach(inimigo => {
      select.innerHTML += `
        <option value="${inimigo.id}">
          ${inimigo.nome}
        </option>
      `;
    });
  } catch (error) {
    console.error('Erro ao carregar inimigos:', error);
  }
}

async function carregarJogadoresSelect() {
  try {
    const resposta = await fetch(`${API}/jogadores`);
    const jogadores = await resposta.json();

    const select = document.getElementById('jogador');
    select.innerHTML = '';

    if (jogadores.length === 0) {
      select.innerHTML = `<option value="">Nenhum jogador criado</option>`;
      return;
    }

    jogadores.forEach(jogador => {
      select.innerHTML += `
        <option value="${jogador.id}">
          ${jogador.nome} - ${jogador.classe} (Nv ${jogador.nivel})
        </option>
      `;
    });
  } catch (error) {
    console.error('Erro ao carregar jogadores no select:', error);
  }
}

async function criarJogador() {
  try {
    const nome = document.getElementById('nome').value.trim();
    const classe_id = document.getElementById('classe').value;

    if (!nome) {
      alert('Digite o nome do jogador');
      return;
    }

    const resposta = await fetch(`${API}/jogadores`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nome, classe_id })
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      alert(dados.erro || 'Erro ao criar jogador');
      return;
    }

    alert(dados.mensagem);
    document.getElementById('nome').value = '';

    listarJogadores();
    carregarJogadoresSelect();
  } catch (error) {
    console.error('Erro ao criar jogador:', error);
  }
}

async function listarJogadores() {
  try {
    const resposta = await fetch(`${API}/jogadores`);
    const jogadores = await resposta.json();

    const lista = document.getElementById('listaJogadores');
    lista.innerHTML = '';

    if (jogadores.length === 0) {
      lista.innerHTML = `<p>Nenhum jogador cadastrado ainda.</p>`;
      return;
    }

    jogadores.forEach(jogador => {
      const vidaMaxima = 150;
      const porcentagemVida = Math.min((jogador.vida / vidaMaxima) * 100, 100);

      lista.innerHTML += `
        <div class="card-jogador">
          <h3>${jogador.nome}</h3>
          <p class="info">🧙 Classe: ${jogador.classe}</p>
          <p class="info">⭐ Nível: ${jogador.nivel}</p>
          <p class="info">✨ XP: ${jogador.xp}</p>
          <p class="info">❤️ Vida: ${jogador.vida}</p>
          <p class="info">⚔️ Ataque: ${jogador.ataque}</p>
          <p class="info">🛡️ Defesa: ${jogador.defesa}</p>

          <div class="barra-status">
            <div class="barra-label">Vida</div>
            <div class="barra">
              <div class="barra-preenchida" style="width: ${porcentagemVida}%"></div>
            </div>
          </div>
        </div>
      `;
    });
  } catch (error) {
    console.error('Erro ao listar jogadores:', error);
  }
}

async function batalhar() {
  try {
    const jogador_id = document.getElementById('jogador').value;
    const inimigo_id = document.getElementById('inimigo').value;
    const resultadoDiv = document.getElementById('resultadoBatalha');

    if (!jogador_id) {
      alert('Escolha um jogador');
      return;
    }

    const resposta = await fetch(`${API}/batalhas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ jogador_id, inimigo_id })
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      alert(dados.erro || 'Erro na batalha');
      return;
    }

    resultadoDiv.className = 'resultado';
    resultadoDiv.classList.add(dados.resultado === 'vitória' ? 'vitoria' : 'derrota');

    resultadoDiv.innerHTML = `
      <p><strong>${dados.mensagem}</strong></p>
      <p>🏁 Resultado: ${dados.resultado}</p>
      <p>⚔️ Dano do jogador: ${dados.dano_jogador}</p>
      <p>👾 Dano do inimigo: ${dados.dano_inimigo}</p>
      <p>❤️ Vida final do jogador: ${dados.vida_final_jogador}</p>
      <p>💀 Vida final do inimigo: ${dados.vida_final_inimigo}</p>
      <p>✨ XP ganho: ${dados.xp_ganho}</p>
      <p>⭐ Nível atual: ${dados.nivel_atual}</p>
      <p>⬆️ Subiu de nível: ${dados.subiu_nivel ? 'Sim' : 'Não'}</p>
    `;

    listarJogadores();
    carregarJogadoresSelect();
  } catch (error) {
    console.error('Erro ao batalhar:', error);
  }
}

carregarClasses();
carregarInimigos();
carregarJogadoresSelect();
listarJogadores();