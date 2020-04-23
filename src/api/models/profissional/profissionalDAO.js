const ProfissionalModel = require('./profissional.model');


class ProfissionalDAO{

    buscarProfissionais(){
        return ProfissionalModel.find();
    }

    buscarProfissional(requisicao){
        let nome = new RegExp(requisicao.params.name,"i","g");

        return ProfissionalModel.find({nome}).populate('examesOcupacionais.exameID',['nome']);

    }

    getProcedimentos(){
        return ProfissionalModel.find()
            .select(['procedimentos','_id','nome','conselhoProfissional']);
    }

    getProfissionaisName(){
        return ProfissionalModel.find()
            .select('nome')
    }

    getProcedimento(req){
        let procedimento = new RegExp(req.params.procedimento,"ig");
        return ProfissionalModel.find({'procedimentos.procedimento':procedimento})
    }

    gravarProfissional(requisicao){

        let profissionais = new ProfissionalModel(requisicao.body);

        return profissionais.save();
    }

    updateProfissional(requisicao){
        let _id = requisicao.params.id;
        return ProfissionalModel.findByIdAndUpdate(_id, requisicao.body, {new:true, runValidators:true });

    }

    apagarProfissional(requisicao){
        let nome = new RegExp(requisicao.params.name, "i");

        return ProfissionalModel.findOneAndDelete({nome});
    }

    deleteProfissionalId(req){
       let _id = req.params.id;

        return ProfissionalModel.findByIdAndDelete({_id});
    }

    apagarTodos() {
        return ProfissionalModel.deleteMany({});
    }

}

module.exports = new ProfissionalDAO;