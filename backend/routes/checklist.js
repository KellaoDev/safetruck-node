const express = require('express');
const router = express.Router();
const checklistController = require('../controllers/CheckListController');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');

router.post('/checklists', authenticateToken, authorizeRole('admin'), checklistController.create);

module.exports = router;