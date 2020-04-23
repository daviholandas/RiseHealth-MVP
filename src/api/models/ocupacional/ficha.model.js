const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let fichaOcupacional = new Schema({
    empresa:{
        cnpj: String, 
        fantasia: String,
        nome: String,
        medico: Object
    },
    colaborador: Object,
    periodicidade: String,
    funcao: Object,
    tempoServico: String,
    dateRegistered: Date,
    dateAttended:Date,
    exames:[Object],
    status:{type:String, default:'NOTATENDIDO'}
});

module.exports = mongoose.model('FichaOcupacional', fichaOcupacional);