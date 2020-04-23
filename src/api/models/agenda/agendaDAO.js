const AgendaModel = require('./agenda.model');

class AgendaDAO {

    setAgenda(req){
        let agenda = new AgendaModel(req.body);
        return agenda.save();
    }

    findAgendas(){
       return AgendaModel.find()
       .populate('pacienteID',['nome','nascimento','documentos','telefone','sexo']);
    }

    findAgendaProfissional(req){
        let profissionalNome = new RegExp(req.params.name,"i");

        return AgendaModel.find({'profissional.nome':profissionalNome})
            .populate('pacienteID', ['nome', 'nascimento', 'documentos','telefone','sexo']);
    }

    findAgendaProfissionalData(req){
        let profissionalNome = new RegExp(req.params.name,"i");
        let date = req.params.date;

        return AgendaModel.find({$and:[{'profissional.nome':profissionalNome},{date}]})
            .populate('pacienteID', ['nome', 'nascimento', 'documentos','telefone','sexo']);
    }

    findAgendamentoPaciente(req){
        let paciente = req.params.id;
        
        return AgendaModel.find({pacienteID:paciente})
            .populate('pacienteID', ['nome', 'nascimento', 'documentos','telefone','sexo']);
    }

    findAgendamentoPacienteData(req){
        let paciente = req.params.id;
        let date = req.params.date;
        
        return AgendaModel.find({$and:[{pacienteID:paciente},{date:date}]})
            .populate('pacienteID', ['nome', 'nascimento', 'documentos','telefone','sexo']);
    }
    
    updateAgendamento(req){
       let agendamento = req.params.id;

       return AgendaModel.findByIdAndUpdate({_id:agendamento},req.body,{new:true});
    }

    setConfirmedAgendamento(req){
        let agendamento = req.params.id;

        return AgendaModel.findByIdAndUpdate({_id:agendamento},{$set:{confirmed:true}});

    }

    unSetConfirmedAgendamento(req){
        let agendamento = req.params.id;

        return AgendaModel.findByIdAndUpdate({_id:agendamento},{$set:{confirmed:false}});

    }

    deleteAgendamento(req){
        let agendaID = req.params.id;

        return AgendaModel.findByIdAndDelete({_id:agendaID})
    }

}

module.exports = new AgendaDAO