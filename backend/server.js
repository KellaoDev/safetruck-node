const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./config/database');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Rotas
const userRoutes = require('./routes/userApi');
app.use(userRoutes);

app.get('/api/status', async (req, res) => {
  try {
    await pool.getConnection();
    res.json({
      status: 'online',
      message: 'API SafeTruck está funcionando',
      database: 'conectado'
    });
  } catch (error) {
    res.json({
      status: 'online',
      message: 'API SafeTruck está funcionando',
      database: 'desconectado'
    });
  }
});

app.use((err, req, res, next) => {
  console.error('Erro global:', err.stack);
  res.status(500).json({ error: 'Erro interno no servidor' });
});

module.exports = app;
