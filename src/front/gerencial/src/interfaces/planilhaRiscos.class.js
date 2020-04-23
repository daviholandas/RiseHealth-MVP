export class PlanilhaRisco{
    constructor(){
        this.nomePlanilha ='',
        this.setores = [{
            nomeSetor:'',
            funcoes:[],
            riscos:[]
        }],
        this.medicoCoordenador = {
            nome:'',
            conselho:''
        }
    }
}