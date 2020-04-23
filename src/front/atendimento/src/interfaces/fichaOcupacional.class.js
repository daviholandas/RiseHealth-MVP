export default class FichaOcupacional{
    constructor(...dados){
        this.empresa =dados.empresa,
        this.colaborador = null,
        this.periodicidade = dados.periodicidade,
        this.funcao =dados.funcao,
        this.tempoServico = dados.tempoServico,
        this.exames = dados.exames,
        this.dateRegistered = dados.date
    }

    mergeExames(exames){
        this.exames.concat(exames)
    }
}