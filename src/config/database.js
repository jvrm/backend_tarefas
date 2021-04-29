const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/todo'; // passa a url do banco, no padrão mongodb://endereço:porta/NomeBanco
mongoose.connect(url, {useNerUrlParser: true});

module.exports = mongoose; //exporta o local do banco, já conectado