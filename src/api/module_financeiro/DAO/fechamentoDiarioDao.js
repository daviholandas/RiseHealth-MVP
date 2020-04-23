const FechamentoDiarioModel = require('../models/fechamentoDiario.model');

class FechamentoDiarioDAO {

    createFechamentoDiario(req){
        let fechamentoDiario = new FechamentoDiarioModel(req.body);
        return fechamentoDiario.save();
    }

    findFechamentosDiarios(){
        return FechamentoDiarioModel.find()
    }

    findDayDone(req){
        let date = req.body.date;
        return FechamentoDiarioModel.findOne({date});
    }
}

module.exports = exports = new FechamentoDiarioDAO;