const PessoaModel = require('../pessoa/pessoa.model');

class PessoaDAO{

    getPessoas(){
        return PessoaModel.find()

    }

    createPessoa(req){
        let pessoa = new PessoaModel(req.body);
        return pessoa.save();
    }

    editPessoa(req){
        let nome = new RegExp(req.params.name, "i");
        let type = req.body.__type;
        return PessoaModel.findOneAndUpdate({$and:[{nome}, {type}]}, req.body, {new:true, runValidators: true })
    }
}

module.exports = new PessoaDAO;