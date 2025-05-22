require('dotenv').config();
const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AuthService {
  static async create({ cpf, username, email, password, role }) {
    try {
      const existing = await User.findByEmail(email)
      const userId = await User.create({ cpf, username, email, password, role })

      if (!cpf || !username || !email || !password || !role) {
        throw { status: 400, type: 'ValidationError', message: 'Todos os campos são obrigatórios' }
      }

      if (role !== 'user' && role !== 'admin') {
        throw { status: 400, type: 'ValidationError', message: 'Role inválido. Deve ser "user" ou "admin".' }
      }

      if (existing) {
        throw { status: 409, type: 'ConflictError', message: 'E-mail já cadastrado' }
      }

      return {
        success: true,
        message: 'Usuário criado com sucesso',
        userId
      }
    } catch (error) {
      throw this.handleError(error, 'error ao criar usuário')
    }
  }

  static async login(email, password) {
    try {
      const user = await User.findByEmail(email)
      const isMatch = await bcrypt.compare(password, user.password)

      if (!email || !password) {
        throw { status: 400, type: 'ValidationError', message: 'E-mail e senha são obrigatórios' }
      }

      if (!user) {
        throw { status: 401, type: 'AuthError', message: 'Credenciais inválidas', details: 'Usuário não encontrado' }
      }

      if (!isMatch) {
        throw { status: 401, type: 'AuthError', message: 'Credenciais inválidas', details: 'Senha incorreta' }
      }

      const token = jwt.sign(
        {
          id: user.id,
          role: user.role,
          iss: 'your-app-name',
          aud: 'your-app-client'
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '1h',
          algorithm: 'HS256'
        }
      )

      return {
        success: true,
        message: 'Login bem-sucedido',
        token,
        expiresIn: 3600,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role,
        },
      }

    } catch (error) {
      throw this.handleError(error, 'error ao logar usuário')
    }
  }

  static handleError(error, defaultMessage) {
    return {
      type: error.type || 'INTERNAL_ERROR',
      message: error.message || defaultMessage,
      statusCode: error.statusCode || 500
    }
  }
}


module.exports = AuthService;
