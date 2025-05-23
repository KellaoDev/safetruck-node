const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/register', authController.create);
router.post('/login', authController.login);
router.get('/profile', authenticateToken, authController.profile);

module.exports = router;
