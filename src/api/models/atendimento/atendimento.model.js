const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let atendimentoSchema = new Schema({
        profissional:{
                nome:String,
                conselho:String
        },
        pacienteID:{type:Schema.Types.ObjectId, ref:'Paciente', required:true},
        date:{type:Date, default:new Date()},
        consulta:[{
             _id:false,
             procedimento:String,
             valor:Number,
             valorLiquidoProcedimento:Number,
             comissaoProfissional:{
                valorComissaoCalc:Number
             }
        }],
        valorConsulta:Number,
        agendaID:{type:Schema.Types.ObjectId, ref:'Agenda'},
        attended:{type:Boolean, default:false},
        prontuario:{
                anamnese:String,
                evolucao:String,
                descricao:String
        }
        
});
module.exports = mongoose.model('Atendimento', atendimentoSchema);