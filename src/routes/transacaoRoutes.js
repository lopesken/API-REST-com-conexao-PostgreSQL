const { Router } = require('express');
const rotas = Router();

const {
    listarTransacoes,
    listarTransacoesID,
    cadastrarTransacao,
    atualizarTransacao,
    deletarTransacao,
    obterExtrato
} = require('../controllers/transacaoControllers');
const {
    validarCorpoRequisicaoDescricao: temDescricao,
    validarCorpoRequisicaoCategoria_id: temCategoria_id,
    validarCorpoRequisicaoTipo: temTipo,
    validarCorpoRequisicaoValor: temValor
} = require('../middlewares/validarCorpoRequisicao');
const { verificarAutenticacao } = require('../middlewares/autenticacao');

rotas.use(verificarAutenticacao);


rotas.get('/', listarTransacoes)
rotas.get('/extrato', obterExtrato)
rotas.get('/:id', listarTransacoesID)
rotas.post('/', temCategoria_id, temDescricao, temTipo, temValor, cadastrarTransacao)
rotas.put('/:id', temDescricao, temValor, temCategoria_id, temTipo, atualizarTransacao)
rotas.delete('/:id', deletarTransacao)


module.exports = rotas