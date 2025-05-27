import api from '../api/AuthApi';

const AuthService = {
  async login(email, password) {
    try {
      const response = await api.login({ email, password })
      return {
        success: response.data.success,
        message: response.data.message,
        data: response.data.data,
        metadata: response.data.meta
      }
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Erro inesperado.' }
    }
  },

  async create({ cpf, username, email, password, role }) {
    try {
      const response = await api.register({ cpf, username, email, password, role })
      return {
        success: true,
        message: response.message,
        data: response.data,
        metadata: response.metadata
      }
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Erro inesperado.' }
    }
  },
}

export default AuthService