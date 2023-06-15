const Usuario = require('../model/Usuario.Model');

const registrar = async (req, res) => {
    try {
        const usuario = await Usuario.findOne({ nome: req.body.nome });

        if (usuario) {
            return res.status(400).json({ status: 'ERRO', erro: 'Já existe um usuário com este nome.' });
        }

        await Usuario.create({
            nome: req.body.nome,
            senha: req.body.senha
        });

        return res.status(200).json({ status: 'OK' });
    } catch (err) {
        return res.status(400).json({ status: 'ERRO', erro: err.message });
    }
};

const login = async (req, res) => {
    try {
        const usuario = await Usuario.findOne({ nome: req.body.nome });

        if (usuario && usuario.senha === req.body.senha) {
            return res.status(200).json({ status: 'OK', nome: usuario.nome, admin: usuario.admin });
        } else {
            return res.status(401).json({ status: 'ERRO', erro: 'Usuário ou senha inválidos.' });
        }
    } catch (err) {
        return res.status(400).json({ status: 'ERRO', erro: err.message });
    }
};

exports.registrar = registrar;
exports.login = login;