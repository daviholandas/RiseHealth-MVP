const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PessoaModel = require('../pessoa/pessoa.model');


PessoaModel.discriminator('Paciente', new Schema({
    convenio:{
        nome:{type:String, default:"Sem Convenio"},
        valor:{type:Number,default:1}
    }
}));



module.exports = mongoose.model('Paciente')