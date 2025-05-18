const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'safetruck',
  waitForConnections: true,
  connectionLimit: 30,
  queueLimit: 0
});

pool.getConnection()
  .then(connection => {
    console.log('✅ Conexão com MySQL estabelecida com sucesso!');
    connection.release();
  })
  .catch(err => {
    console.error('❌ Erro ao conectar ao MySQL:', err);
    process.exit(1);
  });

module.exports = pool;