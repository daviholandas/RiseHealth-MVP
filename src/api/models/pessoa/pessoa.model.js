const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paginatePlguin = require('mongoose-paginate-v2');

const options = {
    discriminatorKey:'__type',
    collection: 'pacientes'
};

let pessoaSchema = new Schema({
    nome:{
        type:String,
        required:true
    },
    nascimento:{
        type:String,
        required:true
    },
    sexo:String,
    documentos:{
        rg:String, 
        cpf:String
    },
    endereco:{
        rua:String,
        bairro:String,
        numero:Number,
        cidade:String,
        estado:String,
        complemento:String
    },
    telefone:String,
    email:String,
    informacoes:String
}, options);

mongoose.plugin(paginatePlguin);

module.exports = mongoose.model('Pessoa', pessoaSchema);