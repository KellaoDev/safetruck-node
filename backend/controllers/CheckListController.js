const ChecklistService = require('../services/CheckListService');

function handleError(error, defaultMessage) {
  return {
    type: error.type || 'INTERNAL_ERROR',
    message: error.message || defaultMessage,
    statusCode: error.statusCode || 500
  }
}

const ChecklistController = {
  async findAll(req, res) {
    try {
      const result = await ChecklistService.findAll()

      return res.status(200).json({
        success: true,
        message: result.message,
        data: result.data,
        meta: result.metadata
      })
    } catch (error) {
      const formattedError = handleError(error, 'Erro ao buscar checklists')
      return res.status(formattedError.statusCode).json({
        success: false,
        type: formattedError.type,
        message: formattedError.message
      })
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
      const formattedError = handleError(error, 'Erro ao buscar checklists pendentes por usuário')
      return res.status(formattedError.statusCode).json({
        success: false,
        type: formattedError.type,
        message: formattedError.message
      })
    }
  },

  async getReturnChecklistsByUserId(req, res) {
    try {
      const user_id = req.user.id
      const result = await ChecklistService.getReturnChecklistsByUserId(user_id)

      return res.status(200).json({
        success: true,
        message: result.message,
        data: result.data,
        meta: result.metadata
      })

    } catch (error) {
      const formattedError = handleError(error, 'Erro ao buscar checklists retornados por usuário')
      return res.status(formattedError.statusCode).json({
        success: false,
        type: formattedError.type,
        message: formattedError.message
      })
    }
  },

  async getPendingChecklists(req, res) {
    try {
      const result = await ChecklistService.getPendingChecklists()

      return res.status(200).json({
        success: true,
        message: result.message,
        data: result.data,
        meta: result.metadata
      })
    } catch (error) {
      const formattedError = handleError(error, 'Erro ao buscar checklists pendentes')
      return res.status(formattedError.statusCode).json({
        success: false,
        type: formattedError.type,
        message: formattedError.message
      })
    }
  },

  async getPendingAndMaintenanceChecklists(req, res) {
    try {
      const result = await ChecklistService.getPendingAndMaintenanceChecklists()

      return res.status(200).json({
        success: true,
        message: result.message,
        data: result.data,
        meta: result.metadata
      })
    } catch (error) {
      const formattedError = handleError(error, 'Erro ao buscar checklists pending ou release')
      return res.status(formattedError.statusCode).json({
        success: false,
        type: formattedError.type,
        message: formattedError.message
      })
    }
  },

  async getReleaseChecklists(req, res) {
    try {
      const result = await ChecklistService.getReleaseChecklists()

      return res.status(200).json({
        success: true,
        message: result.message,
        data: result.data,
        meta: result.metadata
      })
    } catch (error) {
      const formattedError = handleError(error, 'Erro ao buscar checklists liberados')
      return res.status(formattedError.statusCode).json({
        success: false,
        type: formattedError.type,
        message: formattedError.message
      })
    }
  },

  async getReturnChecklists(req, res) {
    try {
      const result = await ChecklistService.getReturnChecklists()

      return res.status(200).json({
        success: true,
        message: result.message,
        data: result.data,
        meta: result.metadata
      })
    } catch (error) {
      const formattedError = handleError(error, 'Erro ao buscar checklists retornados')
      return res.status(formattedError.statusCode).json({
        success: false,
        type: formattedError.type,
        message: formattedError.message
      })
    }
  },

  async getMaintenanceChecklists(req, res) {
    try {
      const result = await ChecklistService.getMaintenanceChecklists()

      return res.status(200).json({
        success: true,
        message: result.message,
        data: result.data,
        meta: result.metadata
      })
    } catch (error) {
      const formattedError = handleError(error, 'Erro ao buscar checklists retornados')
      return res.status(formattedError.statusCode).json({
        success: false,
        type: formattedError.type,
        message: formattedError.message
      })
    }
  },

  async generateReport(req, res) {
    try {
      const { startDate, endDate } = req.query

      const reportData = await ChecklistService.generateReport(startDate, endDate)

      res.json({
        success: true,
        data: reportData
      })
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      })
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
      const formattedError = handleError(error, 'Erro ao criar checklist')
      return res.status(formattedError.statusCode).json({
        success: false,
        type: formattedError.type,
        message: formattedError.message
      })
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
      const formattedError = handleError(error, 'Erro ao marcar checklists como liberado')
      return res.status(formattedError.statusCode).json({
        success: false,
        type: formattedError.type,
        message: formattedError.message
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
        data: result.data,
        meta: result.metadata
      })
    } catch (error) {
      const formattedError = handleError(error, 'Erro ao marcar checklists como retornado')
      return res.status(formattedError.statusCode).json({
        success: false,
        type: formattedError.type,
        message: formattedError.message
      })
    }
  },

  async approveMaintenance(req, res, next) {
    try {
      const { checklist_id } = req.params
      const updateData = req.body

      const result = await ChecklistService.approveMaintenance(
        checklist_id,
        updateData
      )

      return res.status(200).json({
        success: true,
        message: result.message,
        data: result.data,
        meta: result.metadata
      })
    } catch (error) {
      const formattedError = handleError(error, 'Erro ao alterar checklists')
      return res.status(formattedError.statusCode).json({
        success: false,
        type: formattedError.type,
        message: formattedError.message
      })
    }
  }
}

module.exports = ChecklistController;