import { http } from './configAxios'

export default {

    CreateAgenda: (agenda) => http.post(`agendas/add`,agenda),

    GetAgenda: (name, date) => http.get(`agendas/profissional/${name}/${date}`),

    updateAgenda:(id) => http.put(`agendas/${id}`),

    setConfirmed:(id) => http.patch(`agendas/confirmar/${id}`),

    unSetConfirmed: (id) => http.patch(`agendas/desconfirmar/${id}`),

    getAgendamentosPaciente:(id) => http.get(`agendas/paciente/${id}`),

    deleteAgendamento:(agendaID) => http.delete(`agendas/${agendaID}`)

}