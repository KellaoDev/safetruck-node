const ChecklistService = require('../services/CheckListService');

const ChecklistController = {
  async create(req, res) {
    try {
      const { plates, headlights, brakes, tires } = req.body
      const user_id = req.user.id

      const result = await ChecklistService.create({
        user_id,
        plates,
        headlights,
        brakes,
        tires
      })

      return res.status(201).json(result)
    } catch (error) {
      console.error('Error in ChecklistController.create:', error)

      const statusCode = error.statusCode || 500
      const errorMessage = error.message || 'Erro ao criar checklist'

      return res.status(statusCode).json({
        success: false,
        message: errorMessage,
        errorType: error.type || 'InternalError'
      })
    }
  },

  async approveMaintenance(req, res) {
    try {
      const { checklist_id } = req.body;
      const user_id = req.user.id

      const result = await ChecklistService.approveMaintenance(checklist_id, user_id);
      res.status(200).json(result);
    } catch (error) {
      const statusCode = error.type === 'NotFoundError' ? 404 :
        error.type === 'BusinessError' ? 400 : 500;
      res.status(statusCode).json({
        success: false,
        message: error.message || 'Erro ao aprovar checklist',
        errorType: error.type || 'InternalError'
      });
    }
  },

  async findAll(req, res) {
    try {
      const result = await ChecklistService.findAll();

      return res.status(200).json({
        success: true,
        message: result.message,
        data: result.data,
        meta: result.metadata
      });
    } catch (error) {
      console.error('Error in ChecklistController.findAll:', error);

      const statusCode = error.statusCode || 500;
      return res.status(statusCode).json({
        success: false,
        message: error.message || 'Erro ao buscar checklists',
        errorType: error.type || 'InternalError'
      });
    }
  },

  async findByUserId(req, res) {
    try {
      const user_id = req.user.id

      const result = await ChecklistService.findByUserId(user_id)

      return res.status(200).json({
        success: true,
        message: result.message,
        data: result.data,
        meta: result.metadata
      })

    } catch (error) {
      console.error('Error in ChecklistController.findByUserId:', error)

      const statusCode = error.statusCode || 500
      const errorMessage = error.message || 'Erro ao buscar checklists'

      return res.status(statusCode).json({
        success: false,
        message: errorMessage,
        errorType: error.type || 'InternalError'
      })
    }
  },

  async getPendingChecklists(req, res) {
    try {
      const result = await ChecklistService.getPendingChecklists();

      return res.status(200).json(result);
    } catch (error) {
      console.error('Error in ChecklistController.getPendingChecklists:', error);

      return res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Erro interno no servidor',
        details: error.type || 'UnknownError'
      });
    }
  },

  async getReleaseChecklists(req, res) {
    try {
      const result = await ChecklistService.getReleaseChecklists();

      return res.status(200).json(result);
    } catch (error) {
      console.error('Error in ChecklistController.getReleaseChecklists:', error);

      return res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Erro interno no servidor',
        details: error.type || 'UnknownError'
      });
    }
  },

  async getReturnChecklists(req, res) {
    try {
      const result = await ChecklistService.getReturnChecklists();

      return res.status(200).json(result);
    } catch (error) {
      console.error('Error in ChecklistController.getReturnChecklists:', error);

      return res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Erro interno no servidor',
        details: error.type || 'UnknownError'
      });
    }
  },

  async release(req, res) {
    try {
      const { checklist_id } = req.body
      const user_id = req.user.id

      const result = await ChecklistService.release(checklist_id, user_id)

      return res.status(200).json({
        success: true,
        message: result.message,
        data: result.data
      })

    } catch (error) {
      console.error('Error in ChecklistController.release:', error)

      const statusCode = error.statusCode || 500
      const errorMessage = error.message || 'Erro ao liberar checklist'

      return res.status(statusCode).json({
        success: false,
        message: errorMessage,
        errorType: error.type || 'InternalError',
        ...(error.details && { details: error.details })
      })
    }
  },

  async return(req, res) {
    try {
      const { checklist_id } = req.body
      const user_id = req.user.id

      const result = await ChecklistService.return(checklist_id, user_id)

      return res.status(200).json({
        success: true,
        message: result.message,
        data: result.data
      })

    } catch (error) {
      console.error('Error in ChecklistController.return:', error)

      const statusCode = error.statusCode || 500
      const errorMessage = error.message || 'Erro ao marcar checklist como devolvido'

      return res.status(statusCode).json({
        success: false,
        message: errorMessage,
        errorType: error.type || 'InternalError'
      })
    }
  }
}

module.exports = ChecklistController;