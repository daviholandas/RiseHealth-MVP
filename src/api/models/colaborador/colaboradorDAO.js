const ColaboradorModel = require('../colaborador/colaborador.model');


class ColaboradorDAO{

    createColaborador(req){
        const colaborador = new ColaboradorModel(req.body);

        return colaborador.save();
    }

    getColaboradores(){
        return ColaboradorModel.find();
    }
    
    getColaborador(req){
        let nome = new RegExp(req.params.nome, "ig");
        return ColaboradorModel.find({nome})
    }

}

module.exports = new ColaboradorDAO;