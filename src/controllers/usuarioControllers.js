const { poolQuery } = require('../connections/conexao');
const bcrypt = require('bcrypt')

const cadastrar = async (req, res) => {
    const { nome, email, senha } = req.body

    try {
        let senhaCriptografada = await bcrypt.hash(senha, 10)

        const insert = "insert into usuarios (nome,email,senha) values($1,$2,$3) returning id,nome,email "
        const resultado = await poolQuery(insert, [nome, email, senhaCriptografada])

        if (resultado.rowCount === 0) {
            return res.status(400).json({
                mensagem: "Não foi possível cadastrar o usuário"
            })
        }

        return res.status(201).json(resultado.rows[0]);
    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }

}

const detalharUsuario = (req, res) => {
    return res.status(200).json(req.usuarioSemSenha)
}

const atualizar = async (req, res) => {
    const { nome, email, senha } = req.body
    const { id } = req.usuarioSemSenha
    try {
        let senhaCriptografada = await bcrypt.hash(senha, 10)

        const update = 'update usuarios set nome=$1, email=$2, senha=$3 where id = $4 '
        const resultado = await poolQuery(update, [nome, email, senhaCriptografada, id])

        return res.status(204).send()

    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

module.exports = {
    cadastrar,
    detalharUsuario,
    atualizar

}