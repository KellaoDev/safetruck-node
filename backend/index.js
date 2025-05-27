const app = require('./server');
const pool = require('./config/database');

async function startServer() {
    try {
        const connection = await pool.getConnection()
        console.log('✅ MySQL conectado com sucesso!')
        connection.release()

        const PORT = 3000

        app.listen(PORT, () => {
            console.log(`🚀 Servidor rodando na porta ${PORT}`)
            console.log(`🔗 Acesse: http://localhost:${PORT}`)
        })

    } catch (err) {
        console.error('❌ Falha ao conectar ao MySQL:', err.message)
        process.exit(1)
    }
}

startServer()
