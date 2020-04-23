const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let empresaSchema = new Schema({
    nome:{type:String, required:true, unique:true},
    fantasia:String,
    cnpj:{type:String, required:true, unique:true},
    endereco:{
        _id:false,
        logradouro:String,
        bairro:String,
        numero:String,
        cep:String,
        municipio:String,
        uf:String,
        complemento:String
    },
    tipo:String,
    atividade_principal:[{
        _id:false,
        text:String,
        code:String
    }],
    natureza_juridica:String,
    telefone:String,
    responsaveis:[{
        _id:false,
        nome:String,
        cargo:String,
        telefone:String,
        email:String
    }],
    examesOcupacionais:[{
        _id:false,
        exameID:{type:Schema.Types.ObjectId, ref:'Exame'},
        nome:String,
        valor:Number
    }],
    infoOcupacionais:{ type: Schema.Types.ObjectId, ref:'Planilha_Riscos'},
    activated:{ type:Boolean, default:true},
    motivoDesativated:String

});





module.exports = mongoose.model('Empresa', empresaSchema);