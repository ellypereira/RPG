const express = require('express');
const cors = require('cors');

const classesRoutes = require('./routes/classes');
const jogadoresRoutes = require('./routes/jogadores');
const inimigosRoutes = require('./routes/inimigos');
const batalhasRoutes = require('./routes/batalhas');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API do Mini RPG funcionando!');
});

app.use('/classes', classesRoutes);
app.use('/jogadores', jogadoresRoutes);
app.use('/inimigos', inimigosRoutes);
app.use('/batalhas', batalhasRoutes);

module.exports = app;