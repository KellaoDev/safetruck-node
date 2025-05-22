const AuthService = require('../services/AuthService');

const AuthController = {
  async create(req, res) {
    const { cpf, username, email, password, role } = req.body

    try {
      const result = await AuthService.create({
        cpf,
        username,
        email,
        password,
        role
      })

      return res.status(200).json({
        success: true,
        message: result.message,
        data: result.data,
        meta: result.metadata
      })
    } catch (error) {
      throw this.handleError(error, 'error ao criar usuário')
    }
  },

  async login(req, res) {
    const { email, password } = req.body

    try {
      const result = await AuthService.login(email, password)
      return res.status(200).json({
        success: true,
        message: result.message,
        data: result.data,
        meta: result.metadata
      })
    } catch (error) {
      throw this.handleError(error, 'error ao logar usuário')
    }
  },

  profile(req, res) {
    res.json({ message: `Usuário autenticado. ID: ${req.user.id}, Role: ${req.user.role}` })
  },

  async handleError(error, defaultMessage) {
    return {
      type: error.type || 'INTERNAL_ERROR',
      message: error.message || defaultMessage,
      statusCode: error.statusCode || 500
    }
  }
}

module.exports = AuthController;