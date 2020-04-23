const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let riscosSchema = new Schema({
    AGENTE_RISCO:{type: String, required:true},
    CODIGO:String,
    FATOR_DE_RISCO:{type:String, required:true },
    esocial:{type:Boolean, default:false}
});

module.exports = mongoose.model('Riscos', riscosSchema);