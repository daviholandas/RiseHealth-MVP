const EntradaModel = require('../models/entradas.model');

class EntradaDAO{

    createValorEntrada(req){
        let valorEntrada = new EntradaModel(req.body);
        return valorEntrada.save();
    }

    findValoresEntrada(){
        return EntradaModel.find();
    }
}

module.exports = exports = new EntradaDAO;