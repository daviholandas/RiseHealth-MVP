import AgendaService from '../services/AgendaService'
import AtendimentoService from '../services/AtendimentoService';
import Swal from 'sweetalert2'


export default {

makeAtendimento(agendamento, atendimento){
    return new Promise((resolve) => {
        resolve( Swal.fire({
                title: `Deseja confirmar o atendimento?`,
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Sim',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Cancelar'
            })
            .then((result) => {
                if (result.value) {
                    AtendimentoService.saveAtendimento(atendimento)
                        .then(() => {
                            AgendaService.setConfirmed(agendamento._id)
                                .then(resp => {
                                    Swal.fire({
                                        title: resp.data.message,
                                        type: 'success',
                                        confirmButtonColor: '#3085d6',
                                        confirmButtonText: 'Ok'
                                    })
                                })
                        })
                }
        }))
    })
},

dismakeAtendimento(agendamentoID) {
    return new Promise((resolve)=>{
        resolve(
            AgendaService.unSetConfirmed(agendamentoID)
                .then(resp => {
                    Swal.fire({
                        title: resp.data.message,
                        type: 'warning',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Ok'
                    })
                })
                .then(() => {
                    AtendimentoService.deleteAtendimentoAgendada(agendamentoID)
                        .then(resp => {
                            Swal.fire({
                                title: resp.data.message,
                                type: 'warning',
                                confirmButtonColor: '#3085d6',
                                confirmButtonText: 'Ok'
                            })
                        })
                })
        )
    })
},

deleteAgendamento(agendamento){
    return new Promise(resolve => {
        resolve(
            Swal.fire({
                     title: `Deseja apagar o agendamento?`,
                     type: 'warning',
                     showCancelButton: true,
                     confirmButtonColor: '#3085d6',
                     confirmButtonText: 'Sim',
                     cancelButtonColor: '#d33',
                     cancelButtonText: 'Cancelar'
                })
                .then(result => {
                        if (result.value) {
                            AgendaService.deleteAgendamento(agendamento.item._id)
                             .then(resp => {
                                Swal.fire({
                                     title: resp.data.message,
                                     type: 'success',
                                     confirmButtonColor: '#3085d6',
                                     confirmButtonText: 'Ok'
                                })
                            })
                        }
                })
        )
    })
}

}
