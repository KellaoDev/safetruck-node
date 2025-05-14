const { registerUser, loginUser } = require('../services/authService');

const authController = {
  async register(req, res) {
    const { cpf, username, email, password, role } = req.body;

    try {
      const result = await registerUser( {cpf, username, email, password, role} );
      res.status(201).json(result);
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  },

  async login(req, res) {
    const { email, password } = req.body;
    console.log(email, password)

    try {
      const result = await loginUser(email, password);
      res.status(200).json(result);
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  },

  profile(req, res) {
    res.json({ message: `Usuário autenticado. ID: ${req.user.id}, Role: ${req.user.role}` });
  }
};

module.exports = authController;
