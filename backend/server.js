require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

const authRoutes = require('./routes/AuthRoute')
app.use(authRoutes)

const checkListRoutes = require('./routes/CheckListRoute')
app.use(checkListRoutes)

app.use((err, req, res, next) => {
  console.error('Erro global:', err.stack)
  res.status(500).json({ error: 'Erro interno no servidor' })
})

module.exports = app;
