const express = require('express');
const router = express.Router();
const checklistController = require('../controllers/CheckListController');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');

router.post('/checklists', authenticateToken, authorizeRole('admin'), checklistController.create);
router.get('/checklists/me', authenticateToken, authorizeRole('admin'), checklistController.findByUserId);
router.post('/checklists/liberation', authenticateToken, authorizeRole('admin'), checklistController.releaseChecklist)

module.exports = router;