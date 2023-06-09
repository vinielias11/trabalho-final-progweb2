const Resultado = require('../model/Resultado.Model');

const criar = async (req, res) => {
    try {
        await Resultado.create({
            idTeste: req.body.idTeste,
            nomeTeste: req.body.nomeTeste,
            nomeUsuario: req.body.nomeUsuario,
            perguntasTotais: req.body.perguntasTotais,
            respostasCorretas: req.body.respostasCorretas,
            porcentagemAcertos: req.body.porcentagemAcertos
        });

        return res.status(200).json({ status: 'OK' });
    } catch (err) {
        return res.status(400).json({ status: 'ERRO', erro: err.message });
    }
};

const deletar = async (req, res) => {
    try {
        await Resultado.deleteOne({ _id: req.params.id });

        return res.status(200).json({ status: 'OK' });
    } catch (err) {
        return res.status(400).json({ status: 'ERRO', erro: err.message });
    }
};

const recuperarTodos = async (req, res) => {
    try {
        const resultados = await Resultado.find({});

        return res.status(200).json({ status: 'OK', resultados });
    } catch (err) {
        return res.status(400).json({ status: 'ERRO', erro: err.message });
    }
};

exports.criar = criar;
exports.deletar = deletar;
exports.recuperarTodos = recuperarTodos;