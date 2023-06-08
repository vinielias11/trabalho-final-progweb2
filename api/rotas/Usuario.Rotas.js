const express = require('express');
const router = express.Router();
const { registrar, login } = require('../controller/UsuarioController');

router.post('/registrar', registrar);
router.post('/login', login);

module.exports = router;