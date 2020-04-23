const pacienteTypes = `
    type Endereco {
        rua:String
        bairro:String
        numero:String
        cidade:String
        estado:String
        complemento:String
    }

    type Documentos {
        rg:String
        cpf:String
    }
    
    type Convenio {
        nome:String
        valor:Float
    }
 
    type Paciente {
        id:ID!
        nome:String!
        nascimento:String
        sexo:String
        documentos:Documentos
        endereco:Endereco
        dataAtendimento:String
        telefone:String
        email:String
        informacoes:String
        convenio:Convenio
    }
`
const pacienteQueries = `
    pacientes:[Paciente]
    pacienteSearch(nome:String!): [Paciente]
    paciente(nome:String!):Paciente
`



module.exports = { pacienteTypes, pacienteQueries }