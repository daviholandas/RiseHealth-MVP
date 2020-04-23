const PacienteModel = require('./paciente.model');

class PacienteDAO {
    
    buscaPacientes(req){
        return  PacienteModel.find();
    }

    gravarPaciente(requisicao){
       let pacientes = new PacienteModel(requisicao.body);
       return pacientes.save()
     
    }

    buscarPaciente(requisicao){
        let nome = new RegExp(requisicao.params.name, "i");
        return PacienteModel.findOne({nome});
    }

    alteraPaciente(requisicao){
        let nome = new RegExp(requisicao.params.name, "i");
        return PacienteModel.findOneAndUpdate({nome}, requisicao.body, {new:true, runValidators: true })
    }

    addConsultas(pacienteID,dados){
        return PacienteModel.findByIdAndUpdate({_id:pacienteID},{$push:{consultas:dados}})
    }

    apagarPaciente(requisicao){
        let nome = new RegExp(requisicao.params.name, "i");

        return PacienteModel.findOneAndDelete({nome});
    }

    apagarTodos(){
        return PacienteModel.deleteMany({});
    }

}

module.exports = new PacienteDAO



