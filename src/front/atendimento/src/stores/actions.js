import PacienteService from '../services/PacienteService'
import ProfissionalService from '../services/ProfissionalService'
import AtendimentoService from '../services/AtendimentoService'

export default {

    async getPacientes({commit}){
        let dados = await PacienteService.listarPacientes().then(res=>res.data)
        commit('SET_PACIENTES', dados)
    },

    async getProfissionais({commit}){
        let dados = await ProfissionalService.listarProfissionais().then(res => res.data)
        commit('SET_PROFISSIONAIS', dados)
    },

    async setPaciente({commit}, paciente){
        commit('SET_PACINTE_CADASTRO', paciente)
    },

    async getPaciente({commit},nomePaciente){
        let paciente = await PacienteService.getPaciente(nomePaciente).then(res => res.data)
        commit('SET_PACIENTE', paciente)
    },

    async getProfissional({commit},profissional){
        let dado = await ProfissionalService.getProcedimentosProfissional(profissional).then(res => res.data.data.profissional)
        commit('SET_PROFISSIONAL', dado)
    },

    async getProfissionalEdit({commit}, nome){
        let profissional = await ProfissionalService.getProfissional(nome).then(res => res.data.data)
        commit('SET_PROFISSIONALTOEDIT', profissional)
    },
    
    async getAtedimentoFicha({commit},agendaID){
        let atendimento = await AtendimentoService.getAtendimento(agendaID).then(res=>res.data)
        commit('SET_ATENDIMENTOFICHA',atendimento)
    },

    selectingExames({commit}, exames){
        commit('SET_EXAMES_OCUPACIONAIS',exames)
    },

    setFichaOcupacional({commit}, ficha) {
        commit('SET_FICHA_OCUPACIONAL', ficha)
    },

    setASO({commit}, ficha){
        commit('SET_ASO', ficha)
    }

}