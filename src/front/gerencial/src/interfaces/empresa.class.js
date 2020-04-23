 export  class Empresa {
    constructor(infoEmpresa){
        this.nome = infoEmpresa.nome ,
        this.fantasia = infoEmpresa.fantasia,
        this.cnpj = infoEmpresa.cnpj,
        this.endereco = {
            logradouro: infoEmpresa.logradouro,
            bairro: infoEmpresa.bairro,
            numero: infoEmpresa.numero,
            cep: infoEmpresa.cep,
            municipio: infoEmpresa.municipio,
            uf: infoEmpresa.uf,
            complemento: infoEmpresa.complemento
        },
        this.tipo = infoEmpresa.tipo,
        this.natureza_juridica = infoEmpresa.natureza_juridica,
        this.atividade_principal = infoEmpresa.atividade_principal,
        this.responsaveis = [{
            nome:'',
            cargo:'',
            email:'',
            telefone:''
        }],
        this.examesOcupacionais = [],
        this.activated = true
    }

    
}

