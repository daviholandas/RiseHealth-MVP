import AgendamentoHelper from './AgendamentoHelper';

const Helpers = {

    install(Vue){
        Vue.prototype.$agendamentoHelper = AgendamentoHelper;
    }
}

export default Helpers;