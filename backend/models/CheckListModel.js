const pool = require('../config/database');

class Checklist {
  static async create({ user_id, plates, headlights, brakes, tires, date_checklist }) {
    try {
      const [result] = await pool.query(
        'INSERT INTO checklist (user_id, plates, headlights, brakes, tires, date_checklist) VALUES (?, ?, ?, ?, ?, ?)',
        [user_id, plates, headlights, brakes, tires, date_checklist]
      );
      return result.insertId;
    } catch (error) {
      throw new Error('Erro ao criar checklist: ' + error.message);
    }
  }
}

module.exports = Checklist;
