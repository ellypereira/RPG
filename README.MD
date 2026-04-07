# Mini RPG de Cadastro e Batalha

Um projeto fullstack simples com foco em **backend**, desenvolvido para praticar **APIs REST**, **banco de dados** e **lógica de sistema**, utilizando uma temática de RPG para tornar o aprendizado mais legal.

##  Objetivo do Projeto

Aprender na prática:

* Criação de APIs com Node.js
* Integração com banco de dados MySQL
* Estruturação de backend com rotas
* Consumo de API no frontend
* Manipulação de dados (CRUD)

### 🔹 Backend

* Criação de servidor com **Node.js + Express**
* Organização de rotas
* Uso de **middlewares (cors, express.json)**
* Criação de endpoints REST (`GET`, `POST`)
* Tratamento de erros

### 🔹 Banco de Dados

* Modelagem de tabelas relacionais
* Uso de **MySQL**
* Criação de tabelas com **chaves estrangeiras**
* Queries SQL:

  * `SELECT`
  * `INSERT`
  * `UPDATE`
  * `DELETE`

### 🔹 Integração

* Conexão entre backend e banco usando **mysql2**
* Uso de variáveis de ambiente com **dotenv**

### 🔹 Frontend

* Consumo de API com **fetch()**
* Manipulação do DOM com JavaScript
* Atualização dinâmica da interface
* Organização de interface com HTML e CSS

### 🔹 Lógica de Sistema

* Sistema de batalha simples
* Cálculo de dano
* Sistema de XP
* Evolução de nível (level up)

## Tecnologias Utilizadas

### Backend

* Node.js
* Express
* MySQL
* mysql2
* dotenv
* cors

### Frontend

* HTML5
* CSS3
* JavaScript (Vanilla)

### Ferramentas

* VS Code
* Thunder Client (testes de API)
* XAMPP / phpMyAdmin

---

## Estrutura do Banco de Dados

O sistema utiliza as seguintes tabelas:

* `classes` → define os tipos de personagens
* `jogadores` → armazena os jogadores criados
* `inimigos` → armazena os inimigos do jogo
* `batalhas` → histórico das batalhas realizadas

---

##  Como funciona o jogo

###  Criação de personagem

O jogador pode:

* inserir um nome
* escolher uma classe (Guerreiro, Mago ou Arqueiro)

Ao criar:

* os atributos da classe são aplicados automaticamente:

  * vida
  * ataque
  * defesa

---

###  Sistema de batalha

O jogador pode lutar contra um inimigo.

A lógica funciona assim:

* Cada personagem possui:

  * ataque
  * defesa
  * vida

* O dano é calculado com base em:

```
dano = ataque - defesa
```

* O combate ocorre em turnos até que:

  * a vida do jogador ou do inimigo chegue a 0

---

### 🏆 Resultado da batalha

* Se o jogador vencer:

  * ganha XP
  * pode subir de nível

* Se perder:

  * apenas registra derrota

---

### Sistema de nível

* Cada nível exige mais XP
* Ao subir de nível:

  * aumenta ataque
  * aumenta defesa
  * aumenta vida

##  Melhorias futuras

* Histórico de batalhas
* Ranking de jogadores
* Sistema de inventário
* Loja de itens
* Login de usuário
* Interface mais avançada
* Deploy do projeto

---

##  Considerações finais

Este projeto foi desenvolvido com foco em aprendizado prático de backend.
A temática de RPG foi utilizada para tornar o processo mais dinâmico e interessante, simulando um sistema real com regras de negócio.






