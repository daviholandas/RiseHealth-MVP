const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profissionalSchema = new Schema({
    nome:{
        type:String,
        required:true
    },
    documentos:{
        cpf:{type:String, default:'0'},
        rg:{type:String, default:'0'}
    },
    especialidade:{
        type:String,
        required: true
    },
    conselhoProfissional:String,
    procedimentos:[{
        procedimento:String,
        valor:Number,
        comissaoProfissional:{
            tipo:String,
            valor:{type:Number, default:1},
            valorComissaoCalc:{ type:Number, default:0 }
        }
    }],
    examesOcupacionais:[{
        _id:false,
        exameID:{type:Schema.Types.ObjectId, ref:'Exame'},
        nome:String,
        valorComissao:Number
    }],
    telefones:[String]        
});



module.exports = mongoose.model('Profissional', profissionalSchema);