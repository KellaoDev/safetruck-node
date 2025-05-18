const pool = require('../config/database');

class Checklist {
  static async create({ user_id, plates, headlights, brakes, tires, date_checklist, status = 'pending' }) {
    try {
      const [result] = await pool.query(
        `INSERT INTO checklist 
         (user_id, plates, headlights, brakes, tires, date_checklist, status) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [user_id, plates, headlights, brakes, tires, date_checklist, status]
      );
      return result.insertId;
    } catch (error) {
      console.error('Erro ao criar checklist:', error);
      throw new Error('Falha ao registrar checklist no banco de dados');
    }
  }

  static async findByUserId(user_id) {
    try {
      if (!user_id || isNaN(user_id)) {
        throw new Error('ID de usuário inválido');
      }

      const [rows] = await pool.query(
        `SELECT 
           id,
           user_id,
           plates,
           headlights,
           brakes,
           tires,
           status,
           date_checklist,
           date_checklist
         FROM checklist 
         WHERE user_id = ? 
         ORDER BY date_checklist DESC`,
        [Number(user_id)]
      );

      return rows;
    } catch (error) {
      console.error(`Erro ao buscar checklists para usuário ${user_id}:`, error);
      throw new Error('Falha ao recuperar checklists');
    }
  }

  static async updateStatus(checklist_id, user_id, date_liberation) {
    let connection;
    try {
      connection = await pool.getConnection();
      await connection.beginTransaction();

      // Verifica se o checklist pertence ao usuário
      const [checklist] = await connection.query(
        `SELECT id, user_id, status FROM checklist WHERE id = ? FOR UPDATE`,
        [checklist_id]
      );

      if (!checklist.length) {
        throw new Error('Checklist não encontrado');
      }

      if (checklist[0].user_id !== user_id) {
        throw new Error('Você não tem permissão para liberar este checklist');
      }

      // Atualiza o status
      const [updateResult] = await connection.query(
        `UPDATE checklist 
             SET status = 'released'
             WHERE id = ? AND status = 'pending'`,
        [checklist_id]
      );

      if (updateResult.affectedRows === 0) {
        throw new Error('Checklist já está liberado ou não está pendente');
      }

      // Registra na tabela CONTROL
      const [controlResult] = await connection.query(
        `INSERT INTO CONTROL 
             (checklist_id, user_id, date_liberation)
             VALUES (?, ?, ?)`,
        [checklist_id, user_id, date_liberation]
      );

      await connection.commit();

      return {
        checklist_id,
        control_id: controlResult.insertId,
        date_liberation
      };

    } catch (error) {
      if (connection) await connection.rollback();
      throw error;
    } finally {
      if (connection) connection.release();
    }
  }
}

module.exports = Checklist;