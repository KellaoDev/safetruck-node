require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function registerUser({ cpf, username, email, password, role }) {
  const existing = await User.findByEmail(email);
  if (existing) {
    throw { status: 409, message: 'E-mail já cadastrado' };
  }

  if (!cpf || !username || !email || !password || !role) {
    throw new Error('Todos os campos são obrigatórios');
  }

  if (role !== 'user' && role !== 'admin') {
    throw new Error('Role inválido. Deve ser "user" ou "admin".');
  }

  const userId = await User.create({ cpf, username, email, password, role });
  return { message: 'Usuário criado com sucesso', userId };
}

async function loginUser(email, password) {
  const user = await User.findByEmail(email);
  if (!user) throw { status: 401, message: 'Usuário não encontrado' };

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw { status: 401, message: 'Senha incorreta' };

  console.log(process.env.JWT_SECRET)
  
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  return {
    message: 'Login bem-sucedido',
    token,
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    },
  };
}

module.exports = { registerUser, loginUser };
