const AuthService = require('../services/AuthService');

function handleError(error, defaultMessage) {
  return {
    type: error.type || 'INTERNAL_ERROR',
    message: error.message || defaultMessage,
    statusCode: error.statusCode || 500
  }
}

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
      const formattedError = handleError(error, 'Erro ao criar usuário')
      return res.status(formattedError.statusCode).json({
        success: false,
        type: formattedError.type,
        message: formattedError.message
      })
    }
  },

  async login(req, res) {
    const { email, password } = req.body

    try {
      const result = await AuthService.login(email, password)
      return res.status(200).json({
        success: true,
        message: result.message,
        data: {
          user: result.user,
          token: result.token,
          expiresIn: result.expiresIn
        },
        meta: result.metadata
      })
    } catch (error) {
      const formattedError = handleError(error, 'Erro ao logar usuário')
      return res.status(formattedError.statusCode).json({
        success: false,
        type: formattedError.type,
        message: formattedError.message
      })
    }
  },
}

module.exports = AuthController;