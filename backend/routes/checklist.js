const express = require('express');
const router = express.Router();
const checklistController = require('../controllers/CheckListController');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');

router.get('/checklists/me', authenticateToken, authorizeRole('user'), checklistController.findByUserId);
router.get('/checklists/all', authenticateToken, authorizeRole('admin'), checklistController.findAll);
router.post('/checklists', authenticateToken, authorizeRole('admin'), checklistController.create);
router.post('/checklists/released', authenticateToken, authorizeRole('admin'), checklistController.release)
router.post('/checklists/returned', authenticateToken, authorizeRole('admin'), checklistController.return)
router.post('/checklists/approveMaintenance', authenticateToken, authorizeRole('admin'), checklistController.approveMaintenance)

/*
router.post(
    '/checklists/shared-route',
    authenticateToken,
    authorizeRole(['user', 'admin']), // Aceita ambas as roles
    checklistController.sharedMethod
  );
*/

module.exports = router;