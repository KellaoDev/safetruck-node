const Checklist = require('../models/CheckListModel');
const pool = require('../config/database');

function handleError(error, defaultMessage) {
  return {
    type: error.type || 'INTERNAL_ERROR',
    message: error.message || defaultMessage,
    statusCode: error.statusCode || 500
  }
}

class ChecklistService {
  static async findAll() {
    try {
      const checklists = await Checklist.findAll()

      return {
        success: true,
        message: checklists.length > 0
          ? 'Checklists encontrados'
          : 'Nenhum checklist encontrado',
        data: checklists,
        metadata: {
          total: checklists.length,
          pending: checklists.filter(c => c.status === 'pending').length,
          release: checklists.filter(c => c.status === 'release').length,
          return: checklists.filter(c => c.status === 'return').length
        }
      }
    } catch (error) {
      const formattedError = handleError(error, 'Erro ao buscar checklists')
      throw formattedError
    }
  }

  static async findByUserId(user_id) {
    try {
      const checklists = await Checklist.findByUserId(user_id)

      if (!user_id || isNaN(user_id)) {
        const err = new Error('ID do usuário inválido')
        err.statusCode = 400
        err.type = 'VALIDATION_ERROR'
        throw err
      }

      return {
        success: true,
        message: checklists.length > 0 ? 'Checklists encontrados' : 'Nenhum checklist encontrado',
        data: checklists,
        metadata: {
          total: checklists.length,
          pending: checklists.filter(c => c.status === 'pending').length
        }
      }
    } catch (error) {
      const formattedError = handleError(error, 'Erro ao buscar checklists usuário')
      throw formattedError
    }
  }

  static async findByIdForUpdate(checklist_id, user_id = null) {
    try {
      const checklist = await Checklist.findByIdForUpdate(checklist_id)

      if (!user_id || isNaN(user_id)) {
        const err = new Error('ID do usuário inválido')
        err.statusCode = 400
        err.type = 'VALIDATION_ERROR'
        throw err
      }

      if (!checklist_id || isNaN(checklist_id)) {
        const err = new Error('ID do checklist inválido')
        err.statusCode = 400
        err.type = 'VALIDATION_ERROR'
        throw err
      }

      if (!checklist) {
        const err = new Error('Checklist não encontrado')
        err.statusCode = 404
        err.type = 'NOT_FOUND_ERROR'
        throw err
      }

      return {
        success: true,
        message: 'Checklist encontrado com sucesso',
        data: checklist
      }
    } catch (error) {
      const formattedError = handleError(error, 'Erro ao buscar checklists')
      throw formattedError
    }
  }

  static async getReturnChecklistsByUserId(user_id) {
    try {
      const checklists = await Checklist.getReturnChecklistsByUserId(user_id)

      if (!user_id || isNaN(user_id)) {
        const err = new Error('ID do usuário inválido')
        err.statusCode = 400
        err.type = 'VALIDATION_ERROR'
        throw err
      }

      return {
        success: true,
        message: checklists.length > 0 ? 'Checklists encontrados' : 'Nenhum checklist encontrado',
        data: checklists,
        metadata: {
          total: checklists.length,
        }
      }
    } catch (error) {
      const formattedError = handleError(error, 'Erro ao buscar checklists usuário')
      throw formattedError
    }
  }

  static async getPendingAndMaintenanceChecklists() {
    try {
      const returnChecklists = await Checklist.getPendingAndMaintenanceChecklists(['pending', 'maintenance'])

      if (!returnChecklists || returnChecklists.length === 0) {
        const err = new Error('Nenhum checklist pendente ou devolvido encontrado')
        err.statusCode = 404
        err.type = 'NOT_FOUND_ERROR'
        throw err
      }

      return {
        success: true,
        data: returnChecklists,
        message: 'Checklists pendentes ou devolvidos recuperados com sucesso'
      }
    } catch (error) {
      const formattedError = handleError(error, 'Erro ao buscar checklists pendentes ou devolvidos')
      throw formattedError
    }
  }

  static async getPendingChecklists() {
    try {
      const pendingChecklists = await Checklist.getPendingChecklists()

      if (!pendingChecklists || pendingChecklists.length === 0) {
        const err = new Error('Nenhum checklist pendente encontrado')
        err.statusCode = 404
        err.type = 'NOT_FOUND_ERROR'
        throw err
      }

      return {
        success: true,
        data: pendingChecklists,
        message: 'Checklists pendentes recuperados com sucesso',
        metadata: {
          total: pendingChecklists.length,
        }
      }
    } catch (error) {
      const formattedError = handleError(error, 'Erro ao buscar checklists pendentes')
      throw formattedError
    }
  }

  static async getReleaseChecklists() {
    try {
      const releaseChecklists = await Checklist.getReleaseChecklists()

      if (!releaseChecklists || releaseChecklists.length === 0) {
        const err = new Error('Nenhum checklist liberado encontrado')
        err.statusCode = 404
        err.type = 'NOT_FOUND_ERROR'
        throw err
      }

      return {
        success: true,
        data: releaseChecklists,
        message: 'Checklists liberado recuperados com sucesso',
        metadata: {
          total: releaseChecklists.length,
        }
      }
    } catch (error) {
      const formattedError = handleError(error, 'Erro ao buscar checklists liberados')
      throw formattedError
    }
  }

  static async getReturnChecklists() {
    try {
      const returnChecklists = await Checklist.getReturnChecklists()

      if (!returnChecklists || returnChecklists.length === 0) {
        const err = new Error('Nenhum checklist retornado encontrado')
        err.statusCode = 404
        err.type = 'NOT_FOUND_ERROR'
        throw err
      }

      return {
        success: true,
        data: returnChecklists,
        message: 'Checklists retornado recuperados com sucesso',
        metadata: {
          total: returnChecklists.length,
        }
      }
    } catch (error) {
      const formattedError = handleError(error, 'Erro ao buscar checklists retornados')
      throw formattedError
    }
  }

  static async getMaintenanceChecklists() {
    try {
      const maintenanceChecklists = await Checklist.getMaintenanceChecklists()

      if (!maintenanceChecklists || maintenanceChecklists.length === 0) {
        const err = new Error('Nenhum checklist na manutenção encontrado')
        err.statusCode = 404
        err.type = 'NOT_FOUND_ERROR'
        throw err
      }

      return {
        success: true,
        data: maintenanceChecklists,
        message: 'Checklists maintenance recuperados com sucesso',
        metadata: {
          total: maintenanceChecklists.length,
        }
      }
    } catch (error) {
      const formattedError = handleError(error, 'Erro ao buscar checklists maintenance')
      throw formattedError
    }
  }

  static async generateReport(startDate, endDate) {
    try {
        // Validação básica das datas
        if (!startDate || !endDate) {
            throw new Error('Datas inicial e final são obrigatórias')
        }
        
        if (new Date(startDate) > new Date(endDate)) {
            throw new Error('Data inicial não pode ser maior que data final')
        }
        
        const reportData = await Checklist.getChecklistsByDateRange(startDate, endDate)
        return reportData
    } catch (error) {
        throw error
    }
}
  static async create({ user_id, plates, headlights, brakes, tires }) {
    try {
      if (!user_id || isNaN(user_id)) {
        const err = new Error('ID do usuário inválido')
        err.statusCode = 400
        err.type = 'VALIDATION_ERROR'
        throw err
      }

      if (!plates) {
        throw { type: 'ValidationError', message: 'A placa é obrigatório' }
      }

      const needsMaintenance = !headlights || !brakes || !tires
      const status = needsMaintenance ? 'maintenance' : 'pending'
      const date_checklist = this.formatDate(new Date())

      const checklistId = await Checklist.create({
        user_id,
        plates,
        headlights,
        brakes,
        tires,
        date_checklist,
        status
      })

      const createdChecklist = await Checklist.findByUserId(user_id)

      return {
        success: true,
        message: needsMaintenance
          ? 'Checklist criado e enviado para manutenção'
          : 'Checklist criado com sucesso',
        data: {
          checklistId,
          createdChecklist
        }
      }
    } catch (error) {
      const formattedError = handleError(error, 'Erro ao criar checklists.')
      throw formattedError
    }
  }

  static async release(checklist_id, user_id) {
    let connection
    try {
      connection = await pool.getConnection()
      await connection.beginTransaction()

      const checklist = await Checklist.findByIdForUpdate(checklist_id)

      if (!checklist) {
        const err = new Error('Checklist não encontrado')
        err.statusCode = 404
        err.type = 'NOT_FOUND_ERROR'
        throw err
      }

      if (checklist.status !== 'pending') {
        const err = new Error('Checklist não pode ser liberado')
        err.statusCode = 409
        err.type = 'BUSINESS_ERROR'
        throw err
      }

      const date_released = this.formatDate(new Date())
      const affectedRows = await Checklist.updateStatus('released', checklist_id, connection)

      if (affectedRows === 0) {
        const err = new Error('error ao atualizar o checklist')
        err.statusCode = 422
        err.type = 'UPDATE_ERROR'
        throw err
      }

      await connection.commit()

      const controlId = await Checklist.createControlRecord({
        checklist_id,
        user_id,
        date_released,
        date_returned: null
      })

      return {
        success: true,
        message: 'Checklist liberado com sucesso',
        data: {
          checklist_id,
          control_id: controlId,
          date_released,
          status: 'released'
        }
      }
    } catch (error) {
      const formattedError = handleError(error, 'Erro ao marcar checklists como liberado')
      throw formattedError
    }
  }

  static async return(checklist_id, user_id) {
    let connection
    try {
      connection = await pool.getConnection()
      await connection.beginTransaction()

      const checklist = await Checklist.findByIdForUpdate(checklist_id, connection)

      if (!checklist) {
        const err = new Error('Checklist não encontrado')
        err.statusCode = 404
        err.type = 'NOT_FOUND_ERROR'
        throw err
      }

      if (checklist.status !== 'released') {
        const err = new Error('Checklist não pode ser devolvido')
        err.statusCode = 409
        err.type = 'BUSINESS_ERROR'
        throw err
      }

      const date_returned = this.formatDate(new Date())
      const affectedRows = await Checklist.updateStatus('returned', checklist_id, connection)

      if (affectedRows === 0) {
        const err = new Error('error ao atualizar o checklist')
        err.statusCode = 422
        err.type = 'UPDATE_ERROR'
        throw err
      }

      const controlRecord = await Checklist.findControlRecord(checklist_id, connection)
      if (controlRecord) {
        await Checklist.updateControlRecord(date_returned, checklist_id, connection)
      } else {
        await Checklist.createControlRecord({
          checklist_id,
          user_id,
          date_released: null,
          date_returned
        }, connection)
      }

      await connection.commit()

      return {
        success: true,
        message: 'Checklist marcado como devolvido com sucesso',
        data: {
          checklist_id,
          date_returned,
          status: 'returned'
        }
      }
    } catch (error) {
      const formattedError = handleError(error, 'Erro ao marcar checklists como retornados')
      throw formattedError
    }
  }

  static async approveMaintenance(checklist_id, updateData = null) {
    let connection
    try {
      connection = await pool.getConnection()
      await connection.beginTransaction()

      const checklist = await Checklist.findByIdForUpdate(checklist_id, connection)
      if (!checklist) {
        throw { type: 'NotFoundError', message: 'Checklist não encontrado' }
      }

      if (!checklist_id || isNaN(checklist_id)) {
        throw { type: 'ValidationError', message: 'ID do checklist é obrigatório', statusCode: 400 }
      }
      if (checklist.status !== 'maintenance') {
        throw { type: 'BusinessError', message: 'Checklist não está em status de manutenção' }
      }

      const affectedRows = await Checklist.updateStatus('pending', checklist_id, connection)
      if (affectedRows === 0) {
        throw { type: 'UpdateError', message: 'error ao atualizar o checklist' }
      }

      if (updateData) {
        const detailsAffectedRows = await Checklist.updateChecklistDetails(
          updateData,
          checklist_id,
          connection
        )
        if (detailsAffectedRows === 0) {
          throw { type: 'UpdateError', message: 'error ao atualizar os detalhes do checklist' }
        }
      }

      const updatedChecklist = await Checklist.findDetailsById(checklist_id, connection)
      const { plates, headlights, brakes, tires } = updatedChecklist
      if (!plates || !headlights || !brakes || !tires) {
        throw { type: 'BusinessError', message: 'Checklist não pode ser liberado, existem pendências' }
      }
      await connection.commit()

      return {
        success: true,
        data: {
          checklist_id,
          message: updateData
            ? 'checklist aprovado, detalhes atualizados e liberado com sucesso'
            : 'checklist aprovado e liberado com sucesso'
        }
      }
    } catch (error) {
      if (connection) await connection.rollback()
      const formattedError = handleError(error, 'Erro ao aprovar checklist')
      throw formattedError
    } finally {
      if (connection) connection.release()
    }
  }

  static formatDate(date) {
    date.setHours(date.getHours() - 3)
    return date.toISOString().replace('T', ' ').replace(/\..+/, '')
  }
}

module.exports = ChecklistService;