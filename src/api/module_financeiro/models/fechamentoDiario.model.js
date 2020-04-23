const moongose = require('../connectionDB');
const Schema = moongose.Schema;

let fechamentoDiario = new Schema({
    date: Date,
    receitaBruta:Number,
    receitaLiquida:Number,
    comissaoPaga:Number
});

module.exports = exports = moongose.model('FechamentoDiario', fechamentoDiario);