import { http } from './configAxios'


export default {
    listarProfissionais:()=> http.get('/profissionais'),

    salvar:(profissional)=> http.post('profissionais/add', profissional),

    delete:(name) => http.delete(`profissionais/${name}`),
    
    updateProfissional: (name, profissionaEdit) => http.patch(`profissionais/${name}`, profissionaEdit),

    homeQuery:
        async () => {
            return await http.post('api', {
            query: `
                {
                    profissionais {
                        id
                        nome
                        telefones{
                            telefone
                        }
                        especialidade
                        procedimentos {
                            procedimento
                            valor
                        }
                    }
                }
           `
        })
    },

    profissionaisQuery:async () =>{
        return await http.post('api',{
            query:`
                {
                    profissionais{
                        nome
                        especialidade
                        conselhoProfissional
                        procedimentos{
                            procedimento 
                            valor
                            comissaoProfissional{
                                valorComissaoCalc
                            }
                        }
                    }
                }
            `
        })
    },

    getProcedimentosProfissional: async (nome) => {
        return await http.post('api',{
            query:`
                {
                    profissional(nome:"${nome}") {
                        procedimentos {
                            procedimento
                            valor
                        }
                    }
                }
            `
        })
    },

    getProfissional: async(nome) =>{
        return await http.post('api',{
            query:`
                {
                    profissional(nome:"${nome}") {
                        nome
                        especialidade
                        conselhoProfissional
                        procedimentos {
                            procedimento
                            valor
                            comissaoProfissional{
                               tipo
                               valor 
                            }
                        }
                        telefones{
                            telefone
                        }
                    }
                }
            `
        })
    }
}
