const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', async (req, res) => {
  try {
    const [classes] = await db.query('SELECT * FROM classes ORDER BY id');
    res.json(classes);
  } catch (error) {
    console.error('Erro ao buscar classes:', error);
    res.status(500).json({ erro: 'Erro ao buscar classes' });
  }
});

module.exports = router;