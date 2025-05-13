const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

router.get('/users/:id', userController.getUserFindById);
router.get('/users', userController.getAllUsers);
router.post('/users', userController.registerUser);


module.exports = router;