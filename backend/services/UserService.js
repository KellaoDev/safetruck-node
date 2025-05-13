const User = require('../models/User');

class UserService {
  static async registerUser({ email, nome, perfil, senha, cpf }) {
    if (!nome || !email || !senha) {
      throw new Error('Todos os campos são obrigatórios');
    }

    if (senha.length < 6) {
      throw new Error('Senha deve ter pelo menos 6 caracteres');
    }

    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      throw new Error('Email já está em uso');
    }

    return await User.create({ email, nome, perfil, senha, cpf });
  }

  static async getUserFindById(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    return user;
  }

  static async getAllUsers() {
    return await User.findAll();
  }
}

module.exports = UserService;