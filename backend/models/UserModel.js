const bcrypt = require('bcryptjs');
const pool = require('../config/database');

class User {
  static async create({ cpf, username, email, password, role }) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const [result] = await pool.query(
        'INSERT INTO users (cpf, username, email, password, role) VALUES (?, ?, ?, ?, ?)',
        [cpf, username, email, hashedPassword, role]

      );
      return result.insertId;
    } catch (error) {
      throw new Error('Erro ao criar usuário: ' + error.message);
    }
  }

  static async findByEmail(email) {
    try {
      const [rows] = await pool.query(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );
      return rows[0]; // Retorna o primeiro usuário encontrado (ou null)
    } catch (error) {
      throw new Error('Erro ao buscar usuário: ' + error.message);
    }
  }

  static async update(id, { username, email, password }) {
    try {
      let query = 'UPDATE users SET username = ?, email = ?';
      const params = [username, email];

      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        query += ', password = ?';
        params.push(hashedPassword);
      }

      query += ' WHERE id = ?';
      params.push(id);

      const [result] = await pool.query(query, params);
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error('Erro ao atualizar usuário: ' + error.message);
    }
  }

  static async findById(id) {
    try {
      const [rows] = await pool.query(
        'SELECT id, cpf, username, email, password, role FROM users WHERE id = ?',
        [id]
      );
      return rows[0];
    } catch (error) {
      throw new Error('Erro ao buscar usuário por ID: ' + error.message);
    }
  }

  static async findAll() {
    try {
      const [rows] = await pool.query(
        'SELECT id, cpf, username, email, password, role FROM users'
      );
      return rows;
    } catch (error) {
      throw new Error('Erro ao buscar todos os usuários: ' + error.message);
    }
  }

  static async delete(id) {
    try {
      const [result] = await pool.query(
        'DELETE FROM users WHERE id = ?',
        [id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error('Erro ao deletar usuário: ' + error.message);
    }
  }
}

module.exports = User;