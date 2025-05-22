const bcrypt = require('bcryptjs');
const pool = require('../config/database');

class User {
  static async findAll(connection = null) {
    try {
      const query = `SELECT id, cpf, username, email, password, role 
      FROM users`

      const [rows] = connection ?
        await connection.query(query) :
        await pool.query(query)

      return rows
    } catch (error) {
      throw error
    }
  }

  static async findById(id, connection = null) {
    try {
      const query = `SELECT id, cpf, username, email, password, role 
      FROM users 
      WHERE id = ?`
      const params = [id]

      const [rows] = connection ?
        await connection.query(query, params) :
        await pool.query(query, params)

      return rows[0]
    } catch (error) {
      throw error
    }
  }

  static async findByEmail(email, connection = null) {
    try {
      const query = `SELECT * 
      FROM users 
      WHERE email = ?`
      const params = [email]

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
      const { cpf, username, email, password, role } = insertData
      const hashedPassword = await bcrypt.hash(password, 10)

      const query = `INSERT INTO users 
      (cpf, username, email, password, role)
       VALUES (?, ?, ?, ?, ?)`
      const params = [cpf, username, email, hashedPassword, role]

      const [rows] = connection ?
        await connection.query(query, params) :
        await pool.query(query, params)

      return rows.insertId
    } catch (error) {
      throw error
    }
  }
}

module.exports = User;