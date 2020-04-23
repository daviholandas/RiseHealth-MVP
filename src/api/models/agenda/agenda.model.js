const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let agendaSchema = new Schema({
   profissional:{
      nome:String,
      conselho:String  
   },
   date:Date,
   pacienteID:{
      type: Schema.Types.ObjectId,
      ref: 'Paciente',
      required:true
   },
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
   confirmed:{type:Boolean, default:false}  
});

module.exports = mongoose.model('Agenda', agendaSchema); 