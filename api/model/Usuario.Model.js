const mongoose = require('mongoose');

const Usuario = new mongoose.Schema({
    nome: { type: String, required: true },
    senha: { type: String, required: true },
    admin: { type: Boolean, default: false }
});

const UsuarioModel = mongoose.model('Usuario', Usuario);

module.exports = UsuarioModel;