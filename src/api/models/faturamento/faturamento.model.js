const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let faturamentoModel = new Schema({
    empresa:{type:Schema.Types.ObjectId, ref: 'Empresa'},
    valorAberto:Number,
    valorFaturado:Number,
    paidOut:Boolean
});

module.exports = mongoose.model('Faturamento', faturamentoModel);