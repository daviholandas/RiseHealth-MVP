import {http} from '../../plugins/axios'

export  function setExamesSelected({commit}, examesSelected){
    commit('SET_EXAMES_SELECTED', examesSelected)
}

export function setVisableColumns({commit}, visableColumns){
    commit('DEFINE_VISABLE_COLUMNS', visableColumns)
}

export function changeSelectionTableExames({commit}, disable){
    commit('DESABLE_SELECTION_EXAMES', disable)
}

export function setRiscosSelected({commit}, riscosSelected){
    commit('SET_RISCOS_SELECTED', riscosSelected)
}

export async function getPlanilhasRiscos({commit}){
    let planilhas = await http.get('/common/planilhariscos')
    commit('SET_PLANILHA_RISCOS', planilhas.data)
}