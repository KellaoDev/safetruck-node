const express = require('express');
const router = express.Router();
const checklistController = require('../controllers/CheckListController');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');

router.get('/checklists/me', authenticateToken, authorizeRole('admin'), checklistController.findByUserId)
router.get('/checklists/all', authenticateToken, authorizeRole(['user', 'admin']), checklistController.findAll)
router.get('/checklists/pending', authenticateToken, authorizeRole(['user', 'admin']), checklistController.getPendingChecklists)
router.get('/checklists/status', authenticateToken, authorizeRole('admin'), checklistController.getPendingAndMaintenanceChecklists)
router.get('/checklists/release', authenticateToken, authorizeRole('admin'), checklistController.getReleaseChecklists)
router.get('/checklists/return', authenticateToken, authorizeRole('admin'), checklistController.getReturnChecklists)
router.get('/checklists/maintenance', authenticateToken, authorizeRole('admin'), checklistController.getMaintenanceChecklists)
router.get('/checklists/analyze', authenticateToken, authorizeRole('admin'), checklistController.generateReport)
router.post('/checklists', authenticateToken, authorizeRole(['user', 'admin']), checklistController.create)
router.post('/checklists/released', authenticateToken, authorizeRole('admin'), checklistController.release)
router.post('/checklists/returned', authenticateToken, authorizeRole(['user', 'admin']), checklistController.return)
router.patch('/checklists/:checklist_id/approveMaintenance', authenticateToken, authorizeRole('admin'), checklistController.approveMaintenance)

module.exports = router;