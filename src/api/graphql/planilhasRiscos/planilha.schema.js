const planilhasTypes = `
    type Setor {
        nomeSetor:String
        funcoes:[String]
        riscos:
    }    

    type PlanilhaRiscos {
        id:ID,
        nomePlanilha:String,
        setor:[Setor]
    }
`