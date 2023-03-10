const { Router } = require('express');
const rotas = Router();

const {
    cadastrar,
    detalharUsuario,
    atualizar
} = require('../controllers/usuarioControllers');
const {
    validarCorpoRequisicaoEmail: temEmail,
    validarCorpoRequisicaoNome: temNome,
    validarCorpoRequisicaoSenha: temSenha,
} = require('../middlewares/validarCorpoRequisicao');
const {
    verificarDuplicidadeDeEmailAtualizar,
    validarEmail
} = require('../middlewares/validarLogin');
const { verificarAutenticacao } = require('../middlewares/autenticacao');


rotas.post('/', temNome, temEmail, temSenha, validarEmail, cadastrar);

rotas.use(verificarAutenticacao);

rotas.get('/', detalharUsuario);
rotas.put('/', temEmail, temSenha, temNome, verificarDuplicidadeDeEmailAtualizar, atualizar)

module.exports = rotas