const { poolQuery } = require('../connections/conexao');
const jwt = require('jsonwebtoken');

const verificarAutenticacao = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ mensagem: "Para acessar este recurso um token de autenticação válido deve ser enviado." })
    }

    const token = authorization.split(' ')[1]

    try {
        const { id } = jwt.verify(token, process.env.SENHAJWT)

        const { rows, rowCount } = await poolQuery('select * from usuarios where id=$1', [id])

        if (rowCount < 1) {
            return res.status(401).json({ mensagem: "Para acessar este recurso um token de autenticação válido deve ser enviado." })
        }

        let { senha: senhaInultil, ...usuarioSemSenha } = rows[0]
        req.usuarioSemSenha = usuarioSemSenha
        next()
    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

module.exports = {
    verificarAutenticacao
}