import { http } from './configAxios'




export default {

    listarPacientes: () => http.get('pacientes'),

    salvar:(paciente) => http.post('pacientes/add', paciente),
    
    delete:(name)=> http.delete(`pacientes/${name}`,{data:name}),

    deleteAll:() =>http.delete('pacientes'),

    getPaciente:(name) => http.get(`pacientes/${name}`),
    
    getColaboradores: async (name) => await http.get(`pacientes/colaboradores/${name}`),


    updatePaciente:(name, editPaciente) => http.patch(`pacientes/${name}`, editPaciente),

    homeQuery:async () =>{
        return  await http.post('api', {
           query: `
                {
                    pacientes {
                        id
                        nome
                        telefone
                        documentos {
                            cpf
                        }
                        nascimento
                    }
                }
           `
        })
    },
    pacienteConsulta: async (nome) => {
        return await http.post('api', {
            query: `
                {
                 paciente(nome:"${nome}") {
                    id
                    nome
                    nascimento
                    informacoes
                    documentos {
                        cpf
                    }
                 } 
                }
           `
        })
    },
    pacientesAutocomplete: async (nome) => {
        return await http.post('api', {
            query: `
                {
                 pacienteSearch(nome:"${nome}") {
                    id
                    nome
                    nascimento
                    sexo
                    informacoes
                    documentos {
                        cpf
                    }
                    convenio {
                        nome
                        valor
                    }
                    telefone
                 } 
                }
           `
        })
    }


   
}