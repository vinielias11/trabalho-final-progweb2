const Usuario = require('../model/Usuario.Model');

const registrar = async (req, res) => {
    try {
        await Usuario.create({
            nome: req.body.nome,
            senha: req.body.senha
        });

        return res.status(200).json({ status: 'OK' });
    } catch (err) {
        return res.status(400).json({ status: 'ERRO', erro: err });
    }
};

const login = async (req, res) => {
    const usuario = await Usuario.findOne({ nome: req.body.nome });

    if (usuario && usuario.senha === req.body.senha) {
        return res.status(200).json({ status: 'OK', id: usuario._id });
    } else {
        return res.status(401).json({ status: 'ERRO', erro: 'Usuário ou senha inválidos.' });
    }
};

exports.registrar = registrar;
exports.login = login;