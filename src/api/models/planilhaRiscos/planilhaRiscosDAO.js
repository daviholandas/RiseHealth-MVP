const PlanilhaRiscosModel = require('./planilhaRiscos.model');

class PlanilhaRiscosDAO {

    createPlanilhaRiscos(req){
        let planilhaRiscos = new PlanilhaRiscosModel(req.body);
        return planilhaRiscos.save();
    }

    findPlanilhas(){
        return PlanilhaRiscosModel.find();
    }

    updatePlanilha(req){
        let _id = req.params.id;
        return PlanilhaRiscosModel.findByIdAndUpdate({_id},req.body);
    }

    findPlanilhaPerName(req){
        let nomePlanilha = new RegExp(req.params.nome,"ig");
        return PlanilhaRiscosModel.find({nomePlanilha});
    }

    findPlanilha(req){
        //função para decodificar ISO para UTF-8;
        let convertedWord = decodeURIComponent(escape(req.params.planilha));
        let nomePlanilha = new RegExp(convertedWord,"ig");
       
        /* return PlanilhaRiscosModel.findOne({$text: { $search: nomePlanilha } }) */
        return PlanilhaRiscosModel.aggregate(
          [
            {
              '$match': {
                'nomePlanilha': nomePlanilha
              }
            }, {
              '$unwind': {
                'path': '$setores'
              }
            }, {
              '$unwind': {
                'path': '$setores.funcoes'
              }
            }, {
              '$unwind': {
                'path': '$setores.riscos'
              }
            }, {
              '$lookup': {
                'from': 'riscos', 
                'localField': 'setores.riscos.agentes.risco', 
                'foreignField': '_id', 
                'as': 'setores.riscos.agentes'
              }
            }, {
              '$group': {
                '_id': {
                  'Setor': '$setores.nomeSetor', 
                  'Funcao': '$setores.funcoes'
                }, 
                'Riscos': {
                  '$addToSet': '$setores.riscos.agentes'
                }
              }
            }
          ]
        ); 
    }

    getFuncoes(req){
      let convertedWord = decodeURIComponent(escape(req.params.planilha));
      let nomePlanilha = new RegExp(convertedWord,"ig");

      return PlanilhaRiscosModel.aggregate([
          {
            '$match': {
              'nomePlanilha': nomePlanilha
            }
          }, {
            '$unwind': {
              'path': '$setores'
            }
          }, {
            '$group': {
              '_id': null, 
              'Funcoes': {
                '$addToSet': {
                  'Setor': '$setores.nomeSetor', 
                  'Funcao': '$setores.funcoes'
                }
              }
            }
          }
      ]);
    }
}

module.exports = new PlanilhaRiscosDAO;