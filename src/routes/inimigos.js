const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', async (req, res) => {
  try {
    const [inimigos] = await db.query('SELECT * FROM inimigos ORDER BY id');
    res.json(inimigos);
  } catch (error) {
    console.error('Erro ao buscar inimigos:', error);
    res.status(500).json({ erro: 'Erro ao buscar inimigos' });
  }
});

module.exports = router;