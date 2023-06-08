const express = require('express');
const router = express.Router();
const { criar, recuperarPorId, atualizar, deletar, recuperarTodos } = require('../controller/TesteController');

router.post('/Criar', criar);
router.get('/RecuperarPorId/:id', recuperarPorId);
router.put('/Atualizar/:id', atualizar);
router.delete('/Deletar/:id', deletar);
router.get('/RecuperarTodos', recuperarTodos);

module.exports = router;