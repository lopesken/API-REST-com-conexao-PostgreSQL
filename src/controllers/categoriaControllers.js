const { pool } = require('../connections/conexao');

const listarCategorias = async (req, res) => {
    try {
        const select = "select * from categorias"
        const resultado = await pool.query(select)

        if (resultado.rowCount === 0) {
            return res.status(404).json({ mensagem: "Não temos nada na listar de categorias." })
        }

        return res.json(resultado.rows)
    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

module.exports = {
    listarCategorias
}