const { Router } = require('express');
const rotas = Router();

const { login } = require('../controllers/loginControllers')

const { validacaoEmailSenha } = require('../middlewares/validarLogin');

const {
    validarCorpoRequisicaoEmail: temEmail,
    validarCorpoRequisicaoSenha: temSenha,
} = require('../middlewares/validarCorpoRequisicao');


rotas.post('/', temEmail, temSenha, validacaoEmailSenha, login);

module.exports = rotas