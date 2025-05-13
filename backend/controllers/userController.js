const UserService = require('../services/userService');

exports.registerUser = async (req, res) => {
  try {
    const userId = await await UserService.registerUser(req.body);

    res.status(201).json({
      success: true,
      message: 'Usuário registrado com sucesso',
      userId
    });

  } catch (error) {
    handleError(res, error);
  }
};

exports.getUserFindById = async (req, res) => {
  try {
    const user = await UserService.getUserFindById(req.params.id);

    res.json({
      success: true,
      user
    });
  } catch (error) {
    handleError(res, error, error.message.includes('não encontrado') ? 404 : 500);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserService.getAllUsers();

    res.json({
      success: true,
      users
    });
  } catch (error) {
    handleError(res, error);
  }
};

const handleError = (res, error, statusCode = 500) => {
  console.error(error);
  res.status(statusCode).json({
    success: false,
    message: error.message || 'Erro interno no servidor'
  });
};