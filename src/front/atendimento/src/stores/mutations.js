
export default {
    SET_PACIENTES(state, payload){
        state.pacientes = payload
    },

    SET_PROFISSIONAIS(state, payload){
        state.profissionais = payload
    },

    SET_PACIENTE(state, payload){
        state.paciente = payload
    },

    SET_PACINTE_CADASTRO(state, payload){
        state.paciente = payload
    },

    SET_PROFISSIONAL(state, payload){
        state.profissional = Object.assign(payload)
    },
    SET_PROFISSIONALTOEDIT(state, payload){
        state.profissionalToEdit.assign(payload) 
    },
    SET_ATENDIMENTOFICHA(state, payload){
        state.atendimento = Object.assign(payload)
    },

    SET_EXAMES_OCUPACIONAIS(state, payload){
        state.examesOcupacionais = payload
    },

    SET_FICHA_OCUPACIONAL(state, payload){
        state.fichaOcupacional = payload
    },

    SET_ASO(state, payload){
        state.aso = payload
    }
}