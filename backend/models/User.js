const bcrypt = require('bcryptjs');
const pool = require('../config/database');

class User {
  static async create({ email, nome, perfil, senha, cpf }) {
    try {
      const hashedPassword = await bcrypt.hash(senha, 10);
      const [result] = await pool.query(
        'INSERT INTO usuarios (email, nome, perfil, senha, cpf) VALUES (?, ?, ?, ?, ?)',
        [email, nome, perfil, hashedPassword, cpf]

      );
      return result.insertId;
    } catch (error) {
      throw new Error('Erro ao criar usuário: ' + error.message);
    }
  }

  static async findByEmail(email) {
    try {
      const [rows] = await pool.query(
        'SELECT * FROM usuarios WHERE email = ?',
        [email]
      );
      return rows[0]; // Retorna o primeiro usuário encontrado (ou null)
    } catch (error) {
      throw new Error('Erro ao buscar usuário: ' + error.message);
    }
  }

  static async update(id, { nome, email, senha }) {
    try {
      let query = 'UPDATE usuarios SET nome = ?, email = ?';
      const params = [nome, email];

      if (senha) {
        const hashedPassword = await bcrypt.hash(senha, 10);
        query += ', senha = ?';
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
        'SELECT id, email, nome, perfil, senha, cpf FROM usuarios WHERE id = ?',
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
        'SELECT id, email, nome, perfil, senha, cpf FROM usuarios'
      );
      return rows;
    } catch (error) {
      throw new Error('Erro ao buscar todos os usuários: ' + error.message);
    }
  }

  static async delete(id) {
    try {
      const [result] = await pool.query(
        'DELETE FROM usuarios WHERE id = ?',
        [id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error('Erro ao deletar usuário: ' + error.message);
    }
  }
}


module.exports = User;