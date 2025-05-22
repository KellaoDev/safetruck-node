const pool = require('../config/database');

class Checklist {
  static async findAll(connection = null) {
    try {
      const query = `SELECT id, user_id, plates, headlights, brakes, tires, status, date_checklist
      FROM checklist 
      ORDER BY date_checklist DESC`

      const [rows] = connection ?
        await connection.query(query) :
        await pool.query(query)

      return rows
    } catch (error) {
      throw error
    }
  }

  static async findByUserId(user_id, connection = null) {
    try {
      const query = `SELECT id, user_id, plates, headlights, brakes, tires, status, date_checklist
      FROM checklist 
      WHERE user_id = ? 
      ORDER BY date_checklist DESC`
      const params = [user_id]

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

  static async getPendingChecklists(status = 'pending', connection = null) {
    try {
      const query = `SELECT id, user_id, status
      FROM checklist 
      WHERE status = ?`
      const params = [status]

      const [rows] = connection ?
        await connection.query(query, params) :
        await pool.query(query, params)

      return rows[0]
    } catch (error) {
      throw error
    }
  }

  static async getReleaseChecklists(status = 'released', connection = null) {
    try {
      const query = `SELECT id, user_id, status
      FROM checklist 
      WHERE status = ?`
      const params = [status]

      const [rows] = connection ?
        await connection.query(query, params) :
        await pool.query(query, params)

      return rows[0]
    } catch (error) {
      throw error
    }
  }

  static async getReturnChecklists(status = 'returned', connection = null) {
    try {
      const query = `SELECT id, user_id, status
      FROM checklist 
      WHERE status = ?`
      const params = [status]

      const [rows] = connection ?
        await connection.query(query, params) :
        await pool.query(query, params)

      return rows[0]
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
      const query = `UPDATE checklist 
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

  static async updateControlRecord(date_returned, checklist_id) {
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

  static async updateChecklistDetails(checklist_id, updateData, connection = null) {
    try {
      const { user_id, plates, headlights, brakes, tires } = updateData

      const query = `UPDATE checklist 
      SET user_id = ?, plates = ?, headlights = ?, brakes = ?, tires = ?
      WHERE id = ?
      `
      const params = [user_id, plates, headlights, brakes, tires, checklist_id]

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