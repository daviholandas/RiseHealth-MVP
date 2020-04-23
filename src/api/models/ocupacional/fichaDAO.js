const FichaModel = require('./ficha.model');

class FichaDao {
    createFicha(req){
        let ficha = new FichaModel(req.body);
        return ficha.save();
    }

    getFichas(req){
      return FichaModel.aggregate([[
        {
          '$match': {
            '$or': [
                {'dateRegistered': new Date(req.query.date)},
                {'colaborador.nome': new RegExp(req.query.nome,"gi")}, 
                {'empresa.nome': new RegExp(req.query.empresa,"gi")}
            ]
          }
        }
      ]]);
    }

    changeStatus(req){
      let _id = req.params.id;
      return FichaModel.findByIdAndUpdate({_id}, req.body);
    }
}

module.exports = new FichaDao;