const pool = require('../config/database');

class Checklist {
  static async findAll() {
    const [rows] = await pool.query(
      `SELECT 
         id,
         user_id,
         plates,
         headlights,
         brakes,
         tires,
         status,
         date_checklist
       FROM checklist 
       ORDER BY date_checklist DESC`
    )
    return rows
  }

  static async findByUserId(user_id) {
    const [rows] = await pool.query(
      `SELECT 
         id,
         user_id,
         plates,
         headlights,
         brakes,
         tires,
         status,
         date_checklist
       FROM checklist 
       WHERE user_id = ? 
       ORDER BY date_checklist DESC`,
      [user_id]
    )
    return rows
  }

  static async getPendingChecklists(status = 'pending') {
    const [rows] = await pool.query(
      `SELECT 
        id,
        user_id,
        status
       FROM checklist 
       WHERE status = ?`,
      [status]
    )
    return rows
  }

  static async getReleaseChecklists(status = 'released') {
    const [rows] = await pool.query(
      `SELECT 
        id,
        user_id,
        status
       FROM checklist 
       WHERE status = ?`,
      [status]
    )
    return rows
  }

  static async getReturnChecklists(status = 'returned') {
    const [rows] = await pool.query(
      `SELECT 
        id,
        user_id,
        status
       FROM checklist 
       WHERE status = ?`,
      [status]
    )
    return rows
  }

  static async findByIdForUpdate(checklist_id) {
    const [checklist] = await pool.query(
      `SELECT id, user_id, status FROM checklist WHERE id = ? FOR UPDATE`,
      [checklist_id]
    )
    return checklist[0]
  }

  static async findControlRecord(checklist_id) {
    const [record] = await pool.query(
      `SELECT id FROM CONTROL WHERE checklist_id = ?`,
      [checklist_id]
    )
    return record[0]
  }

  static async create({ user_id, plates, headlights, brakes, tires, date_checklist, status }) {
    const [result] = await pool.query(
      `INSERT INTO checklist 
       (user_id, plates, headlights, brakes, tires, date_checklist, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [user_id, plates, headlights, brakes, tires, date_checklist, status]
    )
    return result.insertId
  }

  static async createControlRecord({ checklist_id, user_id, date_released, date_returned }) {
    const [result] = await pool.query(
      `INSERT INTO CONTROL 
       (checklist_id, user_id, date_released, date_returned)
       VALUES (?, ?, ?, ?)`,
      [checklist_id, user_id, date_released, date_returned]
    )
    return result.insertId
  }

  static async updateStatus(checklist_id, status) {
    const [result] = await pool.query(
      `UPDATE checklist SET status = ? WHERE id = ?`,
      [status, checklist_id]
    )
    return result.affectedRows
  }

  static async updateControlRecord({ checklist_id, date_returned }) {
    const [result] = await pool.query(
      `UPDATE CONTROL SET date_returned = ? WHERE checklist_id = ?`,
      [date_returned, checklist_id]
    )
    return result.affectedRows
  }
}

module.exports = Checklist;