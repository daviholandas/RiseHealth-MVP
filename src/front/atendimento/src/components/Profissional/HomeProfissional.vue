<template>
    <v-card>
    <v-card-title>
      <h2>Profissionais</h2>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Buscar"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="Profissionais"
      :search="search"
      rows-per-page-text="Itens por pagina"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.nome | capitalize }}</td>

        <td class="text-xs-center">
          <v-expansion-panel popout>
          <v-expansion-panel-content>
            <div slot="header">Telefones:</div>
            <v-card v-for="(telefones, index) in props.item.telefones" :key="index">
              <v-card-text>Tel.{{index + 1}}- {{ telefones.telefone | toPhone}}</v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
        </td>
        <td class="text-xs-center">{{ props.item.especialidade }}</td>
        <td class="text-xs-center">{{ props.item.conselhoProfissional | upperCase}}</td>
        <td class="justify-center layout px-0">
          <v-icon
            medium
            class="mr-2"
            @click="editProfissional(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            medium
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
           <v-icon
            medium
            @click="infoProfissional(props.item)"
            class="ml-2"
          >
            info
          </v-icon>
        </td>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
    <v-layout>
      <v-dialog v-model="dialog">
        <div v-if="dialog">
          <component :is="componente" :profissionalFetched="profissional" @dialogChange="dialog = $event"/>
        </div>
      </v-dialog>
    </v-layout>
  </v-card>
</template> 

<script>
const EditarProfissional = ()=>({
  component: import('./EditarProfissional.vue')
});

const InfoProfissional = ()=>({
  component: import('./InfoProfissional.vue')
});

import ProfissionalService from '../../services/ProfissionalService.js'
export default {
  components:{
       EditarProfissional,
       InfoProfissional
  },
  beforeCreate(){
    this.$store.dispatch('getProfissionais')
  },
  data(){
    return{
      dialog:false,
      headers: [
        {
          text: 'Profissional',
          align: 'left',
          sortable: false,
          value: 'nome'
        },
        { text: 'Telefone', value: 'telefone',align:'middle' },
        { text: 'Especialidade', value: 'especialidade',align:'middle' },
        { text: 'Conselho Profissional', value: 'conselhoProfissional',align:'middle' },
        { text: '', value: '',align:'middle' }
        ],
      search:"",
      profissional:{},
      componente:''
    }
  },
  computed:{
    Profissionais(){
      return this.$store.state.profissionais
    }
  },
  methods:{
    deleteItem(item){
      const index = this.Profissionais.indexOf(item)
      const nome = item.nome
      this.$swal.fire({
            title:`Tem certeza que quer apagar o profissional ${nome}?`,
            text: "Será irreversível",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Sim, apague!',
            cancelButtonColor: '#d33',
            cancelButtonText:'Cancelar'
      })
      .then((result)=>{
        if(result.value){
          ProfissionalService.delete(nome)
            .then(res=>{
               this.$swal.fire({
                  title:res.data.message,
                  type:'success',
                  timer:3000
                })
            })
            .then(()=>this.Profissionais.splice(index, 1))
        }
      })
    },
    editProfissional(profissional){
      this.profissional = profissional
      this.componente = EditarProfissional
      this.dialog = true
    },
    infoProfissional(profissional){
      this.profissional = profissional
      this.componente = InfoProfissional
      this.dialog = true
    }
  }
}
</script>

<style>

</style>
