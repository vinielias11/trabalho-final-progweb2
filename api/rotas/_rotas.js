const express = require('express');
const router = express.Router();

const rotasUsuario = require('./Usuario.Rotas');
const rotasTeste = require('./Teste.Rotas');
const rotasResultado = require('./Resultado.Rotas');

router.use('/usuario', rotasUsuario);
router.use('/teste', rotasTeste);
router.use('/resultado', rotasResultado);

module.exports = router;