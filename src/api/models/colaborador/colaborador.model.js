const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PessoaModel = require('../pessoa/pessoa.model');



//Usando a função Discriminators, herança!
PessoaModel.discriminator('Colaborador', new Schema({
    empresa:{ type:mongoose.Schema.Types.ObjectId, ref:'Empresa'},
    funcao:String,
    tempoServico:String
}));


module.exports = mongoose.model('Colaborador');