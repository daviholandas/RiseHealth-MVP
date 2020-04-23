import Vue from 'vue'
import Router from 'vue-router'

//views
import Home from './views/Home.vue'
import Pacientes from './views/Paciente.vue'
import Agendamentos from './views/Agendamentos.vue'
import Atendimentos from './views/Atendimentos.vue'
import Ocupacional from './views/Ocupacional.vue'



//imports routes
//PACIENTE
import CadastroPaciente from './components/Paciente/CadastroPaciente.vue'
import EditarPaciente from './components/Paciente/EditarPaciente.vue'
const HomePaciente = () =>({
  component:import('./components/Paciente/HomePaciente.vue')
});

//ATENDIMENTOS
const AtendimentoProfissional = () => import('./components/Atendimento/AtendimentoProfissional.vue')
const AtendimentoALL = () => import('./components/Atendimento/AtendimentosALL.vue')



Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path:'/pacientes',
      component: Pacientes,
      children:[
        {
          path:'',
          name: 'pacientes',
          component:HomePaciente
        },
        {
          path:'addPaciente',
          name:'addPaciente',
          component:CadastroPaciente
        },
        {
          path:'editPaciente',
          component:EditarPaciente
        }
      ]
    },
    {
      path:'/agendamentos',
      name:'agendamento',
      component: Agendamentos,
    },
    {
      path:'/atendimentos',
      component:Atendimentos,
      children:[
        {
          path:'',
          component:AtendimentoALL
        },
        {
          path:':name',
          component:AtendimentoProfissional,
          name:'atendimentoProfissional',
          props:true
        }
      ]
    },
    {
      path:'/ocupacional',
      component:Ocupacional,
      children:[
        {path:'', component: ( ) => import('./components/Ocupacional/FichaAtendimento.vue')},
        {path:'atendimentos', component: ( ) => import('./components/Ocupacional/AtendimentosOcupacional.vue')},
        {path:'printAso', component: ( ) => import('./templates/ASO.vue')}
      ]
    }
  ]
})
