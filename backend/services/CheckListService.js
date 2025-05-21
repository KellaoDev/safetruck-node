const Checklist = require('../models/CheckListModel');
const pool = require('../config/database');

class ChecklistService {
  static async create({ user_id, plates, headlights, brakes, tires }) {
    try {
      if (!user_id || isNaN(user_id)) {
        throw { type: 'VALIDATION_ERROR', message: 'ID de usuário inválido', statusCode: 400 }
      }

      if (!plates || !user_id) {
        throw { type: 'ValidationError', message: 'Placas e ID do usuário são obrigatórios' }
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

      const createdChecklist = await Checklist.findByUserId(checklistId)

      return {
        success: true,
        message: needsMaintenance
          ? 'Checklist criado e enviado para manutenção'
          : 'Checklist criado com sucesso',
        data: {
          id: checklistId,
          status: createdChecklist.status,
          needsMaintenance,
          plates,
          headlights,
          brakes,
          tires
        }
      }
    } catch (error) {
      console.error('Erro em ChecklistService.create:', error)
      throw this.handleError(error, 'Falha ao criar Checklist')
    }
  }

  static async approveMaintenance(checklist_id, user_id) {
    let connection
    try {
      connection = await pool.getConnection()
      await connection.beginTransaction()

      const checklist = await Checklist.findByIdForUpdate(checklist_id, connection)
      if (!checklist) {
        throw { type: 'NotFoundError', message: 'Checklist não encontrado' }
      }
      if (checklist.user_id !== user_id) {
        throw { type: 'AUTH_ERROR', message: 'Sem permissão para marcar como devolvido', statusCode: 403 }
      }
      if (checklist.status !== 'maintenance') {
        throw { type: 'BusinessError', message: 'Checklist não está em status de manutenção' }
      }

      const affectedRows = await Checklist.updateStatus(checklist_id, 'pending', connection)

      if (affectedRows === 0) {
        throw { type: 'UpdateError', message: 'Falha ao atualizar o checklist' }
      }

      await connection.commit()

      return {
        success: true,
        data: {
          checklist_id,
          message: 'Checklist aprovado e liberado com sucesso'
        }
      }
    } catch (error) {
      if (connection) await connection.rollback()
      console.error('Error in CheckListService.approveMaintenance:', error)
      throw error
    } finally {
      if (connection) connection.release()
    }
  }
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
          byStatus: {
            pending: checklists.filter(c => c.status === 'pending').length,
            maintenance: checklists.filter(c => c.status === 'maintenance').length,
            released: checklists.filter(c => c.status === 'released').length,
            returned: checklists.filter(c => c.status === 'returned').length
          }
        }
      }
    } catch (error) {
      console.error('Erro em ChecklistService.findAll:', error)
      throw this.handleError(error, 'Falha ao buscar todos os checklists')
    }
  }

  static async findByUserId(user_id) {
    try {
      if (!user_id || isNaN(user_id)) {
        throw { type: 'VALIDATION_ERROR', message: 'ID de usuário inválido', statusCode: 400 }
      }

      const checklists = await Checklist.findByUserId(user_id)

      return {
        success: true,
        message: checklists.length > 0 ? 'Checklists encontrados' : 'Nenhum checklist encontrado',
        data: checklists,
        metadata: {
          total: checklists.length,
          pending: checklists.filter(c => c.status === 'pending').length,
          released: checklists.filter(c => c.status === 'released').length,
          returned: checklists.filter(c => c.status === 'returned').length
        }
      }
    } catch (error) {
      console.error('Erro em ChecklistService.findByUserId:', error)
      throw this.handleError(error, 'Falha ao buscar checklists')
    }
  }

  static async getPendingChecklists() {
    try {
      const pendingChecklists = await Checklist.getPendingChecklists();

      if (!pendingChecklists || pendingChecklists.length === 0) {
        return {
          success: true,
          data: [],
          message: 'Nenhum checklist pendente encontrado'
        };
      }

      return {
        success: true,
        data: pendingChecklists,
        message: 'Checklists pendentes recuperados com sucesso'
      };
    } catch (error) {
      console.error('Error in ChecklistService.getPendingChecklists:', error);
      throw {
        type: 'InternalError',
        message: 'Falha ao buscar checklists pendentes',
        statusCode: 500
      };
    }
  }

  static async getReleaseChecklists() {
    try {
      const releaseChecklists = await Checklist.getReleaseChecklists();

      if (!releaseChecklists || releaseChecklists.length === 0) {
        return {
          success: true,
          data: [],
          message: 'Nenhum checklist liberado encontrado'
        };
      }

      return {
        success: true,
        data: releaseChecklists,
        message: 'Checklists liberado recuperados com sucesso'
      };
    } catch (error) {
      console.error('Error in ChecklistService.getReleaseChecklists:', error);
      throw {
        type: 'InternalError',
        message: 'Falha ao buscar checklists liberado',
        statusCode: 500
      };
    }
  }

  static async getReturnChecklists() {
    try {
      const returnChecklists = await Checklist.getReturnChecklists();

      if (!returnChecklists || returnChecklists.length === 0) {
        return {
          success: true,
          data: [],
          message: 'Nenhum checklist retornado encontrado'
        };
      }

      return {
        success: true,
        data: returnChecklists,
        message: 'Checklists retornado recuperados com sucesso'
      };
    } catch (error) {
      console.error('Error in ChecklistService.getReturnChecklists:', error);
      throw {
        type: 'InternalError',
        message: 'Falha ao buscar checklists retornado',
        statusCode: 500
      };
    }
  }

  static async release(checklist_id, user_id) {
    try {
      const checklist = await Checklist.findByIdForUpdate(checklist_id)

      if (!checklist) {
        throw { type: 'NOT_FOUND', message: 'Checklist não encontrado', statusCode: 404 }
      }

      if (checklist.user_id !== user_id) {
        throw { type: 'AUTH_ERROR', message: 'Sem permissão para liberar este checklist', statusCode: 403 }
      }

      if (checklist.status !== 'pending') {
        throw {
          type: 'BUSINESS_ERROR',
          message: `Checklist não pode ser liberado. Status atual: ${checklist.status}`,
          statusCode: 400
        }
      }

      const date_released = this.formatDate(new Date())
      await Checklist.updateStatus(checklist_id, 'released')

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
      console.error('Erro em ChecklistService.release:', error)
      throw this.handleError(error, 'Falha ao liberar checklist')
    }
  }

  static async return(checklist_id, user_id) {
    let connection
    try {
      connection = await pool.getConnection()
      await connection.beginTransaction()

      const checklist = await Checklist.findByIdForUpdate(checklist_id, connection)

      if (!checklist) {
        throw { type: 'NOT_FOUND', message: 'Checklist não encontrado', statusCode: 404 }
      }

      if (checklist.user_id !== user_id) {
        throw { type: 'AUTH_ERROR', message: 'Sem permissão para marcar como devolvido', statusCode: 403 }
      }

      if (checklist.status !== 'released') {
        throw {
          type: 'BUSINESS_ERROR',
          message: `Checklist não pode ser devolvido. Status atual: ${checklist.status}`,
          statusCode: 400
        }
      }

      const date_returned = this.formatDate(new Date())

      const affectedRows = await Checklist.updateStatus(checklist_id, 'returned', connection)

      if (affectedRows === 0) {
        throw { type: 'UpdateError', message: 'Falha ao atualizar o checklist' }
      }

      await connection.commit()


      const controlRecord = await Checklist.findControlRecord(checklist_id)
      if (controlRecord) {
        await Checklist.updateControlRecord({ checklist_id, date_returned })
      } else {
        await Checklist.createControlRecord({
          checklist_id,
          user_id,
          date_released: null,
          date_returned
        })
      }

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
      console.error('Erro em ChecklistService.return:', error)
      throw this.handleError(error, 'Falha ao marcar checklist como devolvido')
    }
  }

  static formatDate(date) {
    date.setHours(date.getHours() - 3)
    return date.toISOString().replace('T', ' ').replace(/\..+/, '')
  }

  static handleError(error, defaultMessage) {
    return {
      type: error.type || 'INTERNAL_ERROR',
      message: error.message || defaultMessage,
      statusCode: error.statusCode || 500
    }
  }
}

module.exports = ChecklistService;