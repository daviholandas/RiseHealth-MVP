<template>
    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <q-tree
        :nodes="nodes"
        node-key="label"
        default-expand-all
        control-color	="primary"
      >
        <div slot="header-home" slot-scope="prop">
          <q-btn align="between" class="btn-fixed-width"  flat to='/' :label="prop.node.label"/>
        </div>
        <div slot="header-profissionais" slot-scope="prop">
          <q-btn align="between" class="btn-fixed-width"  flat to='/profissionais' :label="prop.node.label"/>
        </div>
        <div slot="header-cadastro" slot-scope="prop">
          <q-btn align="between" class="btn-fixed-width"  flat to='/profissionais/add' :label="prop.node.label"/>
        </div>
        <div slot="header-empresas" slot-scope="prop">
          <q-btn align="between" class="btn-fixed-width"  flat to='/empresas' :label="prop.node.label"/>
        </div>
        <div slot="header-cadastroEmpresas" slot-scope="prop">
          <q-btn align="between" class="btn-fixed-width"  flat to='/empresas/add' :label="prop.node.label"/>
        </div>
        <div slot="header-examesOcupacionais" slot-scope="prop">
          <q-btn align="between" class="btn-fixed-width"  flat to='/ocupacional/exames' :label="prop.node.label"/>
        </div>
        <div slot="header-planilhaRiscos" slot-scope="prop">
          <q-btn align="between" class="btn-fixed-width"  flat to='/ocupacional/planilhaRiscos' :label="prop.node.label"/>
        </div>
        <div slot="header-riscos" slot-scope="prop">
          <q-btn align="between" class="btn-fixed-width"  flat to='/ocupacional/riscos' :label="prop.node.label"/>
        </div>
        <div slot="header-atendimentos" slot-scope="prop">
          <q-btn align="between" class="btn-fixed-width"  flat to='/movimentacao' :label="prop.node.label"/>
        </div>
        <div slot="header-fechamentoDiario" slot-scope="prop">
          <q-btn align="between" class="btn-fixed-width"  flat to='/movimentacao/fechamentoDiario' :label="prop.node.label"/>
        </div>
      </q-tree>
    </q-layout-drawer>
</template>

<script>
export default {
  data(){
    return {
      nodes: [
        {
          label: 'Menu',
          icon:'menu',
         
          children: [
            {
              label:'Home',
              header:'home'  
            },
            {
              label: 'Profissional',
              children: [
                { label: 'Profissionais', header:'profissionais' },
                { label: 'Cadastro', header:'cadastro' }
              ]
            },
            {
              label: 'Empresa',
              children: [
                { label: 'Empresas', header:'empresas' },
                { label: 'Cadastro/Editar Empresas', header:'cadastroEmpresas' }
              ]
            },
            {
              label:'Ocupacional',
              children:[
                {label:'Exames Ocupacionais', header:'examesOcupacionais'},
                {label:'Planilha de Riscos', header:'planilhaRiscos'},
                {label:'Riscos Ocupacionais', header:'riscos'}
              ]
            },
            {
              label: 'Movimentação Diaria',
              children: [
                { label: 'Atendimentos', header: 'atendimentos' },
                { label: 'Fechamento do Caixa Diario', header: 'fechamentoDiario' }
               
              ]
            }
          ]
        }
      ]
    }
  },
  computed:{
      leftDrawerOpen:{
          get(){
              return this.$store.state.storeMain.drawerState
          },
          set(){
              this.store.commit('storeMain/CHANGE_DRAWER',!this)
          }
      }
  }
}
</script>

<style>

</style>
