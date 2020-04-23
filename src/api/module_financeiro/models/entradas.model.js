const mongoose = require('../connectionDB');
const Schema = mongoose.Schema;

let entradaSchema = new Schema({
    tipo: String,
    valor:Number
});

module.exports = exports = mongoose.model('Entradas', entradaSchema);