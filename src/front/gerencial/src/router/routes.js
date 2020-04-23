
const routes = [
  {
    path: '/gerencial',
    component: () => import('layouts/Home.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },

  {
    path:'/profissionais',
    component: () => import('../layouts/Profissional.vue'),
    children:[
      { path:'', component:() => import('../pages/Profissional/Home.vue') },
      { path:'add', component:() => import('../pages/Profissional/Cadastro.vue')}
    
    ]
  },

  {
    path:'/movimentacao',
    component: () => import('../layouts/Movimentacao.vue'),
    children:[
      {path:'', component:() => import('../pages/Movimentacao/AtendimentosMovimentacao.vue')},
      {path:'fechamentoDiario', component:() => import('../pages/Movimentacao/FechamentoDiario.vue')}
    ]
  },

  {
    path:'/empresas',
    component: () => import('../layouts/Empresas.vue'),
    children:[
      {path:'', component:() => import('../pages/Empresa/Home.vue')},
      {path:'add', component:() => import('../pages/Empresa/Cadastro.vue')}
    ]
  },
  {
    path:'/ocupacional',
    component:() => import('../layouts/Ocupacional.vue'),
    children:[
      {path:'exames', component:() => import('../pages/Ocupacional/Exames.vue')},
      {path:'planilhaRiscos', component:() => import('../pages/Ocupacional/PlanilhaRiscos.vue')},
      {path:'riscos', component:() => import('../pages/Ocupacional/Riscos.vue')}
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
