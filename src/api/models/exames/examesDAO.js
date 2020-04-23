const ExameModel = require('./emaxe.model');

class ExameDAO{

    createExame(req){
        let exame = new ExameModel(req.body)
        return exame.save();
    }

    findExames(){
        return ExameModel.find({'esocial':{$ne:true}});
    }

    findExamesEsocial(){
        return ExameModel.find({'esocial':true})
    }

    findExamesByCategoria(req){
        let categoria = new RegExp(req.params.categoria, "ig");
        return ExameModel.find({categoria});
    };

    updateValorExame(req){
        let _id = req.params.id;
        return ExameModel.findByIdAndUpdate(_id,req.body);
    }

    deleteExame(req){
        let _id = req.params.id;
        return ExameModel.findByIdAndDelete({_id});
    }


}

module.exports = new ExameDAO;