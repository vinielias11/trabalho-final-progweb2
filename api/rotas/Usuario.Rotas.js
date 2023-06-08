const express = require('express');
const router = express.Router();
const { registrar, login } = require('../controller/UsuarioController');

router.post('/Registrar', registrar);
router.post('/Login', login);

module.exports = router;