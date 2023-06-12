const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const rotas = require('./rotas/_Rotas');

const app = express();

app.use(cors());
app.use(express.json());
app.use(rotas);

mongoose.connect('mongodb://127.0.0.1:27017/trabalho-final-progweb2');

const porta = 8080;

app.listen(porta, () => {
    console.log(`Api rodando na porta ${porta}.`);
}); 