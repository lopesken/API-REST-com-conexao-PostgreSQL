const { Router } = require('express');
const rotas = Router();

const { listarCategorias } = require('../controllers/categoriaControllers');
const { verificarAutenticacao } = require('../middlewares/autenticacao');

rotas.use(verificarAutenticacao);

rotas.get('/', listarCategorias)

module.exports = rotas