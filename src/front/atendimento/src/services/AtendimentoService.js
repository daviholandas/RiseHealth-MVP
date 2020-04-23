import { http } from './configAxios';

export default {
    async getAtendimentosDateALL(date){
       let atendimentosALL = await http.get(`atendimentos/date/${date}`)

       return atendimentosALL.data;
    },  

    getAtendimentoAgenda:(agendaId)=>http.get(`atendimentos/agenda/${agendaId}`),

    saveAtendimento:(consulta)=> http.post('atendimentos/add',consulta),

    getAtendimentosProfissional:(profissional) => http.get(`atendimentos/profissional/${profissional}`),

    getAtendimento:(atendimendoID) => http.get(`atendimentos/${atendimendoID}`),

    async getAtendimentosProfissionalData(profissional,date){
        let atendimentos = await http.get(`atendimentos/profissional/${profissional}/${date}`)
        return atendimentos.data;
    },
    deleteAtendimentoAgendada: (agendaID) => http.delete(`atendimentos/agenda/${agendaID}`),
    
    deleteAtendimento:(atendimendoID) => http.delete(`atendimentos/${atendimendoID}`),

    setAttended:(atendimendoID) => http.patch(`atendimentos/${atendimendoID}`),

    getAtendimentosPaciente:(pacienteID) => http.get(`atendimentos/paciente/${pacienteID}`)
}