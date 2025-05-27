const pool = require('../config/database');

class Checklist {
  static async findAll(connection = null) {
    try {
      const query = `SELECT c.id, c.user_id, c.plates, c.headlights, c.brakes, c.tires, c.status, c.date_checklist,
      u.username
      FROM checklist c
      JOIN users u ON c.user_id = u.id
      ORDER BY c.date_checklist DESC
    `

      const [rows] = connection ?
        await connection.query(query) :
        await pool.query(query)

      return rows
    } catch (error) {
      throw error
    }
  }

  static async findByUserId(user_id, status = 'pending', connection = null) {
    try {
      const query = `SELECT id, user_id, plates, headlights, brakes, tires, status, date_checklist
      FROM checklist 
      WHERE user_id = ? AND status =?
      ORDER BY date_checklist DESC`
      const params = [user_id, status]

      const [rows] = connection ?
        await connection.query(query, params) :
        await pool.query(query, params)

      return rows
    } catch (error) {
      throw error
    }
  }

  static async getPendingAndMaintenanceChecklists(statuses = ['pending', 'maintenance'], connection = null) {
    try {
      const placeholders = statuses.map(() => '?').join(', ')
      const query = `SELECT c.id, c.user_id, c.plates, c.headlights, c.brakes, c.tires, c.status, c.date_checklist,
        u.username
        FROM checklist c
        JOIN users u ON c.user_id = u.id
        WHERE c.status IN (${placeholders})
        ORDER BY c.date_checklist DESC`
      const params = statuses

      const [rows] = connection ?
        await connection.query(query, params) :
        await pool.query(query, params)

      return rows
    } catch (error) {
      throw error
    }
  }

  static async getReleaseChecklists(status = 'released', connection = null) {
    try {
      const query = `SELECT c.id, c.user_id, c.plates, c.headlights, c.brakes, c.tires, c.status, 
       c.date_checklist, u.username, ctrl.date_released
      FROM checklist c
      JOIN users u ON c.user_id = u.id
      JOIN control ctrl ON ctrl.checklist_id = c.id
      WHERE c.status = ?
      ORDER BY ctrl.date_released DESC`
      const params = [status]

      const [rows] = connection ?
        await connection.query(query, params) :
        await pool.query(query, params)

      return rows
    } catch (error) {
      throw error
    }
  }

  static async getPendingChecklists(status = 'pending', connection = null) {
    try {
      const query = `SELECT c.id, c.user_id, c.plates, c.headlights, c.brakes, c.tires, c.status, c.date_checklist,
      u.username
      FROM checklist c
      JOIN users u ON c.user_id = u.id
      WHERE c.status = ?
      ORDER BY date_checklist DESC`
      const params = [status]

      const [rows] = connection ?
        await connection.query(query, params) :
        await pool.query(query, params)

      return rows
    } catch (error) {
      throw error
    }
  }

  static async getReturnChecklists(status = 'returned', connection = null) {
    try {
      const query = `SELECT c.id, c.user_id, c.plates, c.headlights, c.brakes, c.tires, c.status, c.date_checklist,
      u.username
      FROM checklist c
      JOIN users u ON c.user_id = u.id
      WHERE c.status = ?
      ORDER BY date_checklist DESC`
      const params = [status]

      const [rows] = connection ?
        await connection.query(query, params) :
        await pool.query(query, params)

      return rows
    } catch (error) {
      throw error
    }
  }

  static async getMaintenanceChecklists(status = 'maintenance', connection = null) {
    try {
      const query = `SELECT c.id, c.user_id, c.plates, c.headlights, c.brakes, c.tires, c.status, c.date_checklist,
      u.username
      FROM checklist c
      JOIN users u ON c.user_id = u.id
      WHERE c.status = ?
      ORDER BY date_checklist DESC`
      const params = [status]

      const [rows] = connection ?
        await connection.query(query, params) :
        await pool.query(query, params)

      return rows
    } catch (error) {
      throw error
    }
  }

  static async findByIdForUpdate(checklist_id, connection = null) {
    try {
      const query = `SELECT id, user_id, status 
      FROM checklist 
      WHERE id = ? FOR UPDATE`
      const params = [checklist_id]

      const [rows] = connection ?
        await connection.query(query, params) :
        await pool.query(query, params)

      return rows[0]
    } catch (error) {
      throw error
    }
  }

  static async findControlRecord(checklist_id, connection = null) {
    try {
      const query = `SELECT id 
      FROM CONTROL 
      WHERE checklist_id = ?`
      const params = [checklist_id]

      const [rows] = connection ?
        await connection.query(query, params) :
        await pool.query(query, params)

      return rows
    } catch (error) {
      throw error
    }
  }

  static async findDetailsById(checklist_id, connection = null) {
    try {
      const query = `SELECT plates, headlights, brakes, tires FROM checklist WHERE id = ?`
      const params = [checklist_id]

      const [rows] = connection ?
        await connection.query(query, params) :
        await pool.query(query, params)

      return rows[0]
    } catch (error) {
      throw error
    }
  }

  static async getChecklistsByDateRange(startDate, endDate, connection = null) {
    try {
      const query = `
                SELECT 
                    c.plates AS Placa,
                    u.username AS Motorista,
                    c.date_checklist AS "Data do Checklist",
                    ct.date_released AS "Data de Liberação",
                    ct.date_returned AS "Data de Retorno"
                FROM 
                    CHECKLIST c
                JOIN 
                    USERS u ON c.user_id = u.id
                LEFT JOIN 
                    CONTROL ct ON ct.checklist_id = c.id
                WHERE 
                    c.date_checklist BETWEEN ? AND ?
                ORDER BY 
                    c.date_checklist DESC
            `
      const params = [startDate, endDate]

      const [rows] = connection ?
        await connection.query(query, params) :
        await pool.query(query, params)

      return rows
    } catch (error) {
      throw error
    }
  }

  static async create(insertData, connection = null) {
    try {
      const { user_id, plates, headlights, brakes, tires, date_checklist, status } = insertData

      const query = `INSERT INTO checklist 
      (user_id, plates, headlights, brakes, tires, date_checklist, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`
      const params = [user_id, plates, headlights, brakes, tires, date_checklist, status]

      const [rows] = connection ?
        await connection.query(query, params) :
        await pool.query(query, params)

      return rows.insertId
    } catch (error) {
      throw error
    }
  }

  static async createControlRecord(insertData, connection = null) {
    try {
      const { checklist_id, user_id, date_released, date_returned } = insertData

      const query = `INSERT INTO CONTROL 
      (checklist_id, user_id, date_released, date_returned)
      VALUES (?, ?, ?, ?)`
      const params = [checklist_id, user_id, date_released, date_returned]

      const [rows] = connection ?
        await connection.query(query, params) :
        await pool.query(query, params)

      return rows.insertId
    } catch (error) {
      throw error
    }
  }

  static async updateStatus(status, checklist_id, connection = null) {
    try {
      const query = `UPDATE CHECKLIST 
      SET status = ? 
      WHERE id = ?`
      const params = [status, checklist_id]

      const [rows] = connection ?
        await connection.query(query, params) :
        await pool.query(query, params)

      return rows.affectedRows
    } catch (error) {
      throw error
    }
  }

  static async updateControlRecord(date_returned, checklist_id, connection = null) {
    try {
      const query = `UPDATE CONTROL 
      SET date_returned = ? 
      WHERE checklist_id = ?`
      const params = [date_returned, checklist_id]

      const [rows] = connection ?
        await connection.query(query, params) :
        await pool.query(query, params)

      return rows.affectedRows
    } catch (error) {
      throw error
    }
  }

  static async updateChecklistDetails(updateData, checklist_id, connection = null) {
    try {
      const { plates, headlights, brakes, tires } = updateData

      const query = `UPDATE checklist
            SET plates = ?, headlights = ?, brakes = ?, tires = ?
            WHERE id = ?`
      const params = [plates, headlights, brakes, tires, checklist_id]

      const [result] = connection ?
        await connection.query(query, params) :
        await pool.query(query, params)

      return result.affectedRows
    } catch (error) {
      throw error
    }
  }
}

module.exports = Checklist;