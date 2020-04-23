const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Models onde são usandos os schema EXAMES
const ProfissionalModel = require('../profissional/profissional.model');


let examesSchema = new Schema({
    categoria:String,
    nome:String,
    codigo27:String,
    esocial:Boolean,
    valor:Number
});




module.exports = mongoose.model('Exame', examesSchema);