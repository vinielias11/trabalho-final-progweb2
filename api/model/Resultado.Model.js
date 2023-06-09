const mongoose = require('mongoose');

const Resultado = new mongoose.Schema({
    idTeste: { type: Number, required: true },
    nomeTeste: { type: String, required: true },
    nomeUsuario: { type: String, required: true },
    perguntasTotais: { type: Number, required: true },
    respostasCorretas: { type: Number, required: true },
    porcentagemAcertos: { type: String, required: true }
});

const ResultadoModel = mongoose.model('Resultado', Resultado);

module.exports = ResultadoModel;