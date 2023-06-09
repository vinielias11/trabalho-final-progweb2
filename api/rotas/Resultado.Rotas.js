const express = require('express');
const router = express.Router();
const { criar, deletar, recuperarTodos } = require('../controller/ResultadoController');

router.post('/Criar', criar);
router.delete('/Deletar/:id', deletar);
router.get('/RecuperarTodos', recuperarTodos);

module.exports = router;