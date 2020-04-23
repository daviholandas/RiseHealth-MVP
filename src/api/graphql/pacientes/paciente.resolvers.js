const pacienteModel = require('../../models/paciente/paciente.model')

module.exports = {
    Query:{
        pacientes: () =>{
            return pacienteModel.find()
        },

        pacienteSearch: ( parent, {nome} ) =>{
         nome = new RegExp(nome, "i");
            return pacienteModel.find({nome})
        },

        paciente: (parent, {nome}) =>{
            nome = new RegExp(nome,"i");
            return pacienteModel.findOne({nome})
        }
    }
}