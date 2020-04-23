
const profissionaisTypes = `

    type Telefones{
        telefone:String
    }

    type Comissao {
        tipo:String
        valor:Float
        valorComissaoCalc:Float
    }
    

    type Procedimentos {
        id:ID
        procedimento:String
        valor:Float
        comissaoProfissional:Comissao
    }


    type Profissional {
        id:ID!
        nome:String!
        especialidade:String!
        conselhoProfissional:String
        procedimentos:[Procedimentos]
        telefones:[Telefones]
    }

`

const profissionaisQueries = `
    profissionais:[Profissional]
    profissional(nome:String!) : Profissional
`

module.exports = {profissionaisTypes, profissionaisQueries}