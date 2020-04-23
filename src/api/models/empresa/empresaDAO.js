const EmpresaModel = require('./empresa.model');
const { axios } = require('../../config/express');

class EmpresaDAO{

    getDadosEmpresa(req){
        let cnpj = req.params.cnpj;
         return axios.get(`https://www.receitaws.com.br/v1/cnpj/${cnpj}`);
    }

    createEmpresa(req){
        let empresa = new EmpresaModel(req.body);
        return empresa.save();
    }

    findEmpresas(){
        return EmpresaModel.find().populate('examesOcupacionais.exameID',['nome']);
    }

    findEmpresa(req){
        let _id = req.params.id
        return EmpresaModel.findByIdAndUpdate({_id}).populate('infoOcupacionais');
    }

    findEmpresaPerName(req){
        let fantasia = new RegExp(req.params.fantasia, "ig");
        return EmpresaModel.find({$or:[{fantasia}, {cnpj:fantasia}]})
            .populate('examesOcupacionais.exameID',['nome'])
            .populate('infoOcupacionais');
    }

    getEmpresaInfoOcupacionais(req){
        let fantasia = new RegExp(req.params.fantasia, "i");
        return EmpresaModel.aggregate([
            {
              '$match': {
                '$or': [
                  {
                    'fantasia': fantasia
                  }, {
                    'cnpj': fantasia
                  }
                ]
              }
            }, {
              '$lookup': {
                'from': 'planilha_riscos', 
                'localField': 'infoOcupacionais', 
                'foreignField': '_id', 
                'as': 'infoOcupacionais'
              }
            }, {
              '$project': {
                'fantasia': 1, 
                'nome': 1, 
                'cnpj': 1, 
                'infoOcupacionais.setores.nomeSetor': 1, 
                'infoOcupacionais.setores.funcoes': 1, 
                'infoOcupacionais.setores.riscos': 1, 
                'infoOcupacionais.medicoCoordenador': 1
              }
            }, {
              '$unwind': {
                'path': '$infoOcupacionais'
              }
            }, {
              '$unwind': {
                'path': '$infoOcupacionais.setores'
              }
            },{
              '$unwind': {
                'path': '$infoOcupacionais.setores.funcoes'
              }
            },{
              '$group': {
                '_id': {
                  'nome': '$nome', 
                  'fantasia': '$fantasia', 
                  'cnpj': '$cnpj',
                  'medico': '$infoOcupacionais.medicoCoordenador'
                }, 
                'InfoOcupacionais': {
                  '$addToSet': '$infoOcupacionais.setores'
                }
              }
            }
          ]);
    }

    updateEmpresa(req){
        let _id = req.params.id;
        return EmpresaModel.findOneAndUpdate({_id},req.body,{upsert:true});
    }

    deleteEmpresa(req){
        let _id = req.params.id;
        return EmpresaModel.findByIdAndDelete(_id);
    }
}

module.exports = new EmpresaDAO;