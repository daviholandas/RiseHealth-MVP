const profissionalModel = require('../../models/profissional/profissional.model')

module.exports = {
    Query:{
        profissionais: () =>{
            return profissionalModel.find()
        },

        profissional: (parent, {nome}) =>{
            nome = new RegExp(nome, "i");
            return profissionalModel.findOne({nome})
        }
    }
}