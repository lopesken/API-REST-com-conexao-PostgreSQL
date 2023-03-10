const { poolQuery } = require('../connections/conexao');
const { getDataFormatada } = require('../utils/dataFormatado');

const listarTransacoes = async (req, res) => {
    const { id } = req.usuarioSemSenha
    const categorias = req.query.filtro
    const categorias_like = [];

    if (categorias) {

        for (const categoria of categorias) {
            categorias_like.push(`%${categoria}%`);
        }
    }

    try {
        if (categorias === undefined) {
            const select = `select t.id,t.tipo,t.descricao,t.valor,t.data,t.usuario_id,t.categoria_id, c.descricao as categoria_nome  
            from transacoes t 
            inner join categorias c on c.id = t.categoria_id
            where t.usuario_id=$1`
        const resultado = await poolQuery(select, [id])

            if (resultado.rowCount === 0) {
                return res.status(404).json({ "mensagem": "Transação não encontrada." })
            }

        return res.json(resultado.rows)
        }
        const selectCategorias = `select t.id,t.tipo,t.descricao,t.valor,t.data,t.usuario_id,t.categoria_id, c.descricao as categoria_nome  
        from transacoes t 
        inner join categorias c on c.id = t.categoria_id
        where t.usuario_id=$1 and lower(c.descricao) ilike any($2::text[])`
        const resultadoTransacao = await poolQuery(selectCategorias, [id, categorias_like])

        return res.json(resultadoTransacao.rows)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: error.message })
    }
}

const listarTransacoesID = async (req, res) => {
    const { id: idUser } = req.usuarioSemSenha
    const { id } = req.params
    try {
        const select = "select * from transacoes where usuario_id = $1 and id = $2"
        const resultado = await poolQuery(select, [idUser, id])

        if (resultado.rowCount === 0) {
            return res.status(404).json({ "mensagem": "Transação não encontrada." })
        }

        return res.json(resultado.rows[0])

    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

const cadastrarTransacao = async (req, res) => {
    const { descricao, valor, categoria_id, tipo } = req.body
    const { id } = req.usuarioSemSenha

    try {
        const insertSelect = `insert into transacoes (descricao, valor, data, categoria_id, usuario_id, tipo) 
        values ($1, $2, $3, $4, $5, $6) 
        returning id, tipo, descricao, valor, data, usuario_id , categoria_id, 
        (select descricao from categorias where id=$4) as categoria_nome;`

        const resultado = await poolQuery(insertSelect, [descricao, valor, getDataFormatada(), categoria_id, id, tipo])

        return res.status(201).json(resultado.rows[0]);
    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

const atualizarTransacao = async (req, res) => {
    const { id } = req.params
    const { descricao, valor, categoria_id, tipo } = req.body
    const { id: userID } = req.usuarioSemSenha

    try {
        const updateTransacao = `update transacoes set descricao=$1, valor=$2, data=$3 ,categoria_id=$4, tipo=$5 where usuario_id=$6 and id=$7`
        const resultado = await poolQuery(updateTransacao, [descricao, valor, getDataFormatada(), categoria_id, tipo, userID, id])
        if (!resultado.rowCount) {
            return res.status(404).json({ mensagem: 'Transação não encontrada.' })
        }
        return res.status(204).send()
    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }

}

const deletarTransacao = async (req, res) => {
    const { id } = req.params
    const { id: userID } = req.usuarioSemSenha

    try {

        const deleteTransacao = `delete from transacoes where id = $1 and usuario_id = $2`
        const resultado = await poolQuery(deleteTransacao, [id, userID])

        if (resultado.rowCount < 1) {
            return res.status(404).json({ mensagem: 'Transação não encontrada.' })
        }
        return res.status(204).send()
    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

const obterExtrato = async (req, res) => {
    const { id } = req.usuarioSemSenha

    try {
        const selectExtrato = `
              SELECT
                (SELECT COALESCE(SUM(valor), 0) FROM transacoes WHERE tipo = 'entrada' AND usuario_id = $1) AS entrada,
                (SELECT COALESCE(SUM(valor), 0) FROM transacoes WHERE tipo = 'saida' AND usuario_id = $1) AS saida;
            `
        const resultado = await poolQuery(selectExtrato, [id])

        return res.json({ entrada: resultado.rows[0].entrada, saida: resultado.rows[0].saida })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: error })
    }
}

module.exports = {
    listarTransacoes,
    listarTransacoesID,
    cadastrarTransacao,
    atualizarTransacao,
    deletarTransacao,
    obterExtrato
}