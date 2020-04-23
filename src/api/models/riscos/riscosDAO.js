const RiscosModel = require('./riscos.model');

class RiscosDAO{

    createRisco(req){
        return new Promise((resolve)=>{
           resolve( req.body.map(risco =>{
                let riscos = new RiscosModel(risco);
                riscos.save();
            }));
        });
    }

    findByIdRiscos(req){
        let _id = req.params.id;
        return RiscosModel.findById({_id});
    }

    findRiscos(){
        return RiscosModel.find();
    }
    
    findRiscoByAgente(req){
        let AGENTE_RISCO = new RegExp(req.params.agente,"ig");
        return RiscosModel.find({$and:[{AGENTE_RISCO},{esocial:false}]});
    }
    findRiscoByAgenteEsocial(req){
        let AGENTE_RISCO = new RegExp(req.params.agente,"ig");
        return RiscosModel.find({$and:[{AGENTE_RISCO},{esocial:true}]}).sort({CODIGO:1});
    }

    findRiscoByCodigoEsocial(req){
        let CODIGO = req.params.codigo;
        return RiscosModel.findOne({CODIGO})
    }

    findByFatorRiscoEsocial(req){
		let FATOR_DE_RISCO = new RegExp(req.params.fator,"ig");
		console.log(encodeURIComponent(req.params.fator).replace(/['()]/g, escape))
		return RiscosModel.find({$and:[{FATOR_DE_RISCO},{esocial:true}]});
	
    }
}

module.exports = new RiscosDAO;     