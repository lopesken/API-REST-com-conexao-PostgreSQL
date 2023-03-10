const { poolQuery } = require('../connections/conexao');
const bcrypt = require('bcrypt');

const verificarDuplicidadeDeEmailAtualizar = async (req, res, next) => {
    let { email } = req.body
    let { id } = req.usuarioSemSenha

    try {
        const selectEmail = "select * from usuarios where email=$1"
        const resultado = await poolQuery(selectEmail, [email])

        if (!resultado.rowCount) {
            next()
        } else if (resultado.rows[0].id === id && resultado.rows[0].email === email) {
            next()
        } else {
            return res.status(400).json({
                mensagem: "Já existe usuário cadastrado com o e-mail informado."
            })
        }
    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

const validarEmail = async (req, res, next) => {
    let { email } = req.body

    try {
        const selectEmail = "select * from usuarios where email=$1"
        const resultado = await poolQuery(selectEmail, [email])

        if (resultado.rowCount) {
            return res.status(400).json({
                mensagem: "Já existe usuário cadastrado com o e-mail informado."
            })
        }
        next()
    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

const validacaoEmailSenha = async (req, res, next) => {
    let { email, senha } = req.body
    try {
        const selectEmail = "select * from usuarios where email=$1"
        const resultado = await poolQuery(selectEmail, [email])
        const usuario = resultado.rows[0]

        if (resultado.rowCount == 0) {
            return res.status(401).json({
                mensagem: "Usuário e/ou senha inválido(s)."
            })
        }

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha)

        if (senha !== usuario.senha && !senhaCorreta) {
            return res.status(401).json({
                mensagem: "Usuário e/ou senha inválido(s)."
            })
        }

        let { senha: senhaInultil, ...usuarioSemSenha } = usuario
        req.usuario = usuarioSemSenha

        next()
    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensagem: error.message })
    }
}

module.exports = {
    verificarDuplicidadeDeEmailAtualizar,
    validacaoEmailSenha,
    validarEmail
}

