const validarCorpoRequisicaoEmail = (req, res, next) => {
    const { email } = req.body
    if (!email) {
        return res.status(400).json({ mensagem: "informe o e-mail" })
    }
    next()
}

const validarCorpoRequisicaoSenha = (req, res, next) => {
    const { senha } = req.body
    if (!senha) {
        return res.status(400).json({ mensagem: "informe a senha" })
    }
    next()
}

const validarCorpoRequisicaoNome = (req, res, next) => {
    const { nome } = req.body
    if (!nome) {
        return res.status(400).json({ mensagem: "informe o nome" })
    }
    next()
}

const validarCorpoRequisicaoDescricao = (req, res, next) => {
    const { descricao } = req.body
    if (!descricao) {
        return res.status(400).json({ mensagem: "informe a descrição" })
    }
    next()
}
const validarCorpoRequisicaoValor = (req, res, next) => {
    const { valor } = req.body
    if (!valor) {
        return res.status(400).json({ mensagem: "informe o valor" })
    }
    next()
}

const validarCorpoRequisicaoCategoria_id = (req, res, next) => {
    const { categoria_id } = req.body
    if (!categoria_id) {
        return res.status(400).json({ mensagem: "informe a categoria" })
    }
    next()
}
const validarCorpoRequisicaoTipo = (req, res, next) => {
    const { tipo } = req.body
    if (!tipo) {
        return res.status(400).json({ mensagem: "informe o tipo" })
    }
    if (tipo !== "entrada" && tipo !== "saida") {
        return res.status(400).json({ mensagem: `O tipo deverá ser necessárioamente "entrada" ou "saida"` })
    }
    next()
}

module.exports = {
    validarCorpoRequisicaoSenha,
    validarCorpoRequisicaoNome,
    validarCorpoRequisicaoEmail,
    validarCorpoRequisicaoDescricao,
    validarCorpoRequisicaoCategoria_id,
    validarCorpoRequisicaoTipo,
    validarCorpoRequisicaoValor,

}