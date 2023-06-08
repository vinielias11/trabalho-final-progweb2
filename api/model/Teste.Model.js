const mongoose = require('mongoose');

const Teste = new mongoose.Schema({
    nome: { type: String, required: true },
    materia: { type: String, required: true },
    dificuldade: { type: String, required: true },
    perguntas: { type: Array, required: true, default: [] }
});

const TesteModel = mongoose.model('Teste', Teste);

module.exports = TesteModel;