require('dotenv').config();
const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function handleError(error, defaultMessage) {
  return {
    type: error.type || 'INTERNAL_ERROR',
    message: error.message || defaultMessage,
    statusCode: error.statusCode || 500
  }
}

class AuthService {
  static async create({ cpf, username, email, password, role }) {
    try {
      if (!cpf || !username || !email || !password || !role) {
        const err = new Error('Todos os campos são obrigatórios')
        err.statusCode = 400
        err.type = 'VALIDATION_ERROR'
        throw err
      }

      if (role !== 'user' && role !== 'admin') {
        const err = new Error('Perfil inválido')
        err.statusCode = 400
        err.type = 'VALIDATION_ERROR'
        throw err
      }

      const existing = await User.findByEmail(email)

      if (existing) {
        const err = new Error('Email já cadastrado')
        err.statusCode = 400
        err.type = 'VALIDATION_ERROR'
        throw err
      }

      const userId = await User.create({ cpf, username, email, password, role })

      return {
        success: true,
        message: 'Usuário criado com sucesso',
        userId
      }
    } catch (error) {
      const formattedError = handleError(error, 'Erro ao cadastrar usuário')
      throw formattedError
    }
  }

  static async login(email, password) {
    try {
      if (!email || !password) {
        const err = new Error('E-mail e senha são obrigatórios')
        err.statusCode = 400
        err.type = 'VALIDATION_ERROR'
        throw err
      }

      const user = await User.findByEmail(email)
      if (!user) {
        const err = new Error('Usuário não encontrado')
        err.statusCode = 404
        err.type = 'NOT_FOUND_ERROR'
        throw err
      }

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        const err = new Error('Senha incorreta')
        err.statusCode = 401
        err.type = 'AUTH_ERROR'
        throw err
      }

      const token = jwt.sign(
        { id: user.id, role: user.role, iss: 'your-app-name', aud: 'your-app-client' },
        process.env.JWT_SECRET,
        { expiresIn: '1h', algorithm: 'HS256' }
      )

      return {
        success: true,
        message: 'Login bem-sucedido',
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role
        },
        token,
        expiresIn: 3600,
      }
    } catch (error) {
      const formattedError = handleError(error, 'Erro ao logar usuário')
      throw formattedError
    }
  }
}

module.exports = AuthService;
