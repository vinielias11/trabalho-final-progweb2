const express = require('express');
const router = express.Router();

const rotasUsuario = require('./Usuario.Rotas');

router.use('/usuario', rotasUsuario);

module.exports = router;