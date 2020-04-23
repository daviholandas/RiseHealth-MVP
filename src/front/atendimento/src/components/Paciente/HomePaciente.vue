<template>
  <div class="toolbar">
  <v-card-title>
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
    :items="Pacientes"
    :search="search"
    class="elevation-1"
    rows-per-page-text="Itens por pagina"
    :rows-per-page-items="propsTables"
    
  >
    <template slot="no-data">
      <v-alert :value="true" color="error" icon="warning">
        Erro no servidor!
      </v-alert>
    </template>
    <template slot="items" slot-scope="props">
      <td class="text-xs-center"><v-btn flat @click="makeConsulta(props.item.nome)">{{ props.item.nome | capitalize }}</v-btn> </td>
      <td class="text-xs-center">{{ props.item.telefone | toPhone }}</td>
      <td class="text-xs-center">{{ props.item.documentos.cpf | toCPF }}</td>
      <td class="text-xs-center">{{ props.item.nascimento }}</td>
      <td class="text-xs-center">{{ props.item.nascimento | idade }}</td>
      <td class="justify-center layout px-0">
          <v-icon
            medium
            class="mr-2"
            @click="editPaciente(props.item)"
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
            @click="infoPaciente(props.item)"
            class="ml-2"
          >
           info
          </v-icon>
          <v-icon
            medium
            @click="infoAtendimentosPaciente(props.item._id)"
            class="ml-2"
          >
          local_hospital
          </v-icon>
        </td>
    </template>
  </v-data-table>
  <v-layout>
      <v-dialog v-model="dialog">
        
        <div v-if="dialog">
          <component :is="componente" :pacienteFetched="paciente" @dialogChange="dialog = $event"/>
        </div>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
import PacienteService from '../../services/PacienteService.js'

const EditarPaciente = ()=>({
  component: import('./EditarPaciente.vue')
})
const InfoPaciente = ()=>({
  component: import('./InfoPaciente.vue')
})
const infoAtendimentosPaciente = () =>({
  component:import('./InfoAtendimentosPaciente.vue')
})
export default {
components:{
  EditarPaciente,
  InfoPaciente
},
data(){
  return {
     headers: [
          { text: 'Nome', value: 'nome', align:'center' },
          { text: 'Telefone', value: 'telefone', align:'center' },
          { text: 'CPF', value: 'CPF', align:'center' },
          { text: 'Data de nascimento', value: 'nascimento', align:'center' },
          { text: 'Idade', value: 'idade', align:'center' },
          { text: '', value: '', align:'center' }
        ],
        propsTables:[20],
        search:"",
        dialog:false,
        dialogInfo:false,
        paciente:{},
        componente:''
  }
},
beforeCreate(){
  this.$store.dispatch('getPacientes')
},
computed:{
  Pacientes(){
    return this.$store.state.pacientes
  }
 
},
methods:{
  deleteItem(item){
    const nome = item.nome
    const index = this.Pacientes.indexOf(item)
    this.$swal.fire({
            title:`Tem certeza que quer apagar o paciente ${nome}?`,
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
          PacienteService.delete(nome)
            .then(res=>{
               this.$swal.fire({
                  title:res.data.message,
                  type:'success',
                  timer:3000
                })
            })
            .then(()=>this.Pacientes.splice(index, 1))
        }
    })
  },
  editPaciente(paciente){
    this.paciente = paciente
    this.componente = EditarPaciente
    this.dialog = true
  },
  makeConsulta(name){
    this.$swal.fire({
      title: 'Deseja agendar uma consulta?',
      text: `Paciente: ${name}`,
      type: 'question',
      showCancelButton: true,
      cancelButtonText:'Não',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim'
    }).then((result)=>{
      if(result.value){
        this.$store.dispatch('getPaciente' ,name)
        setTimeout(() => {
          this.$router.push({name:'agendamento'})
        }, 3000);
      }
    })
  
  },
  infoPaciente(paciente){
    this.paciente = paciente
    this.componente = InfoPaciente
    this.dialog = true
  },
  infoAtendimentosPaciente(paciente){
    this.paciente = paciente
    this.componente = infoAtendimentosPaciente
    this.dialog = true
  }
}
}
</script>

<style>

</style>

