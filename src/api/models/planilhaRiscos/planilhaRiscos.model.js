const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let planilhaRiscosSchema = new Schema({
    nomePlanilha:String,
    setores:[{
        _id:false,
        nomeSetor:String,
        funcoes:[String],
        riscos:[{
            _id:false,
            agente:String,
            codigo:String,
            fator:String
        }]
    }],
    medicoCoordenador:{
        _id:false,
        nome:String,
        conselho:String
    }
});




module.exports = mongoose.model('Planilha_Riscos',planilhaRiscosSchema);