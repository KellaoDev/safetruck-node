const ChecklistService = require('../services/CheckListService');

const ChecklistController = {
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
      throw this.handleError(error, 'error ao buscar todos os checklists')
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
      throw this.handleError(error, 'error ao buscar checklist por usuario')
    }
  },

  async getPendingChecklists(req, res) {
    try {
      const result = await ChecklistService.getPendingChecklists();

      return res.status(200).json({
        success: true,
        message: result.message,
        data: result.data,
        meta: result.metadata
      })
    } catch (error) {
      throw this.handleError(error, 'error ao buscar checklists pendentes')
    }
  },

  async getReleaseChecklists(req, res) {
    try {
      const result = await ChecklistService.getReleaseChecklists();

      return res.status(200).json({
        success: true,
        message: result.message,
        data: result.data,
        meta: result.metadata
      })
    } catch (error) {
      throw this.handleError(error, 'error ao buscar checklists liberados')
    }
  },

  async getReturnChecklists(req, res) {
    try {
      const result = await ChecklistService.getReturnChecklists();

      return res.status(200).json({
        success: true,
        message: result.message,
        data: result.data,
        meta: result.metadata
      })
    } catch (error) {
      throw this.handleError(error, 'error ao buscar checklists retornados')
    }
  },

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

      return res.status(200).json({
        success: true,
        message: result.message,
        data: result.data,
        meta: result.metadata
      })
    } catch (error) {
      throw this.handleError(error, 'error ao criar checklist')
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
        data: result.data,
        meta: result.metadata
      })
    } catch (error) {
      throw this.handleError(error, 'error ao marcar checklist como liberado')
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
        data: result.data,
        meta: result.metadata
      })
    } catch (error) {
      throw this.handleError(error, 'error ao marcar checklist como retornado')
    }
  },

  async approveMaintenance(req, res, next) {
    try {
      const { checklist_id } = req.params;
      const user_id = req.user.id;
      const updateData = req.body;

      const result = await ChecklistService.approveMaintenance(
        checklist_id,
        user_id,
        updateData
      )

      return res.status(200).json({
        success: true,
        message: result.message,
        data: result.data,
        meta: result.metadata
      })
    } catch (error) {
      throw this.handleError(error, 'error ao alterar checklist')
    }
  },

  async handleError(error, defaultMessage) {
    return {
      type: error.type || 'INTERNAL_ERROR',
      message: error.message || defaultMessage,
      statusCode: error.statusCode || 500
    }
  }
}

module.exports = ChecklistController;