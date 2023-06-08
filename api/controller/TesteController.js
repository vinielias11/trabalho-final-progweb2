const mongoose = require('mongoose');
const Teste = require('../model/Teste.Model');

const criar = async (req, res) => {
    try {
        await Teste.create({
            nome: req.body.nome,
            materia: req.body.materia,
            dificuldade: req.body.dificuldade,
            perguntas: req.body.perguntas
        });

        return res.status(200).json({ status: 'OK' });
    } catch (err) {
        return res.status(400).json({ status: 'ERRO', erro: err.message });
    }
};

const recuperarPorId = async (req, res) => {
    try {
        const teste = await Teste.findById(req.params.id);

        return res.status(200).json({ status: 'OK', teste });
    } catch (err) {
        const mensagem = err instanceof mongoose.Error.CastError ? 'O id passado para recuperar é inválido.' : err.message;

        return res.status(400).json({ status: 'ERRO', erro: mensagem });
    }
};

const atualizar = async (req, res) => {
    try {
        const teste = await Teste.findById(req.params.id);

        teste.nome = req.body.nome;
        teste.materia = req.body.materia;
        teste.dificuldade = req.body.dificuldade;
        teste.perguntas = req.body.perguntas;

        await teste.save();

        return res.status(200).json({ status: 'OK' });
    } catch (err) {
        return res.status(400).json({ status: 'ERRO', erro: err.message });
    }
};

const deletar = async (req, res) => {
    try {
        await Teste.deleteOne({ _id: req.params.id });

        return res.status(200).json({ status: 'OK' });
    } catch (err) {
        return res.status(400).json({ status: 'ERRO', erro: err.message });
    }
};

const recuperarTodos = async (req, res) => {
    try {
        const testes = await Teste.find({});

        return res.status(200).json({ status: 'OK', testes });
    } catch (err) {
        return res.status(400).json({ status: 'ERRO', erro: err.message });
    }
};

exports.criar = criar;
exports.recuperarPorId = recuperarPorId;
exports.atualizar = atualizar;
exports.deletar = deletar;
exports.recuperarTodos = recuperarTodos;