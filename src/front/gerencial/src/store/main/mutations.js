
export const CHANGE_DRAWER= (state,value) =>{
    state.drawerState = value 
    if(value){
        setTimeout(() => {
            state.drawerState = false
        }, 5000);
    }
}

export const SET_EXAMES_SELECTED = (state, payload) =>{
    state.selectedExames = payload
}

export const DEFINE_VISABLE_COLUMNS = (state, payload) =>{
    state.visableColumns = payload
}

export const DESABLE_SELECTION_EXAMES = (state, payload) =>{
    state.DESABLE_SELECTION_EXAMES = payload
}

export const SET_RISCOS_SELECTED = (state, payload) =>{
    state.riscosSelected = payload
}

export const SET_PLANILHA_RISCOS = (state, payload) =>{
    state.planilhasRiscos = payload
}

