const express = require('express');
const router = express.Router();

const rotasUsuario = require('./Usuario.Rotas');
const rotasTeste = require('./Teste.Rotas');

router.use('/usuario', rotasUsuario);
router.use('/teste', rotasTeste);

module.exports = router;