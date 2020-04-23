<template>
<div class="toolbar">
  <v-card-title>
    <v-flex xs10 lg2  pt-4 pb-0>
        <v-menu
            ref="menu1"
            v-model="menu1"
            :close-on-content-click="false"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            max-width="290px"
            min-width="290px"
        >
        <v-text-field
            slot="activator"
            outline
            v-model="dateFormatted"
            label="Data"
            prepend-icon="event"
        ></v-text-field>
            <v-date-picker v-model="date" no-title @input="menu1 = false"  locale="pt"></v-date-picker>
        </v-menu>
    </v-flex>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Buscar Paciente"
        single-line
        hide-details
      ></v-text-field>
  </v-card-title>
  <v-card-title>
    <h2>{{$route.params.name}}</h2>
  </v-card-title>
  <v-data-table
    :headers="headers"
    :items="atendimentosDay"
    :search="search"
    class="elevation-1"
    rows-per-page-text="Itens por pagina"
    :rows-per-page-items="propsTables"
    
  >
    
    <template slot="items" slot-scope="props">
      <template v-if="props.item.attended">
        <tr :id="props.index" :class='trClass'>
        <td class="text-xs-center" >{{ props.item.pacienteID.nome | capitalize }} </td>
        <td class="text-xs-center">{{ props.item.pacienteID.documentos.cpf | toCPF}} </td>
        <td class="text-xs-center">{{props.item.pacienteID.nascimento}}</td>
        <td class="text-xs-center">{{props.item.pacienteID.nascimento | idade}} anos</td>
        <td class="text-xs-center">
                <div v-for="procedimento in props.item.consulta" :key='procedimento.procedimento' class="listProcedimentos ml-2 pt-3">
                    <p>{{procedimento.procedimento}}</p>
                </div>
        </td>
        <td class="text-xs-center"><v-btn round :color='colorButton'>{{textButton}}</v-btn></td>
        </tr>
      </template>
      <template v-else>
        <tr :id="props.index">
        <td class="text-xs-center" >{{ props.item.pacienteID.nome | capitalize }}</td>
        <td class="text-xs-center">{{ props.item.pacienteID.documentos.cpf | toCPF}} </td>
        <td class="text-xs-center">{{props.item.pacienteID.nascimento}}</td>
        <td class="text-xs-center">{{props.item.pacienteID.nascimento | idade}} anos</td>
        <td class="text-xs-center">
                <div v-for="procedimento in props.item.consulta" :key='procedimento.procedimento' class="listProcedimentos ml-2 pt-3">
                    <p>{{procedimento.procedimento}}</p>
                </div>
        </td>
        <td class="text-xs-center"><v-btn color='info' round  @click="changeStatus(props.item._id, props.index)">Atender</v-btn></td>
        <td class="text-xs-center"><v-btn flat icon medium @click="deleteAtendimento(props.item._id, props.index)"><v-icon>delete</v-icon></v-btn></td>
        </tr>
      </template>
      </template>
        
 
  </v-data-table>
  </div>
</template>

<script>
import AtendimentoService from '../../services/AtendimentoService.js'
import moment from 'moment'
export default {
    created(){
       this.getAtendimentos()
    },
    data(vm){
       return {
            headers: [
                { text: 'Nome', value: 'nome', align:'center' },
                { text: 'CPF', value: 'CPF', align:'center' },
                { text: 'Data de nascimento', value: 'nascimento', align:'center' },
                { text: 'Idade', value: 'idade', align:'center' },
                { text: 'Procedimentos', value: 'procedimentos', align:'center' },
                { text: 'Status', value: 'status', align:'center' },
                { text: '', value: '', align:'center' },
            ],
            propsTables:[-1],
            search:"",
            nomePaciente:'',
            profissionalName: this.$route.params.name,
            date:new Date().toISOString().substr(0, 10),
            dateFormatted:vm.formatDate(new Date().toISOString().substr(0, 10)),
            menu1:false,
            dateAtendimento:vm.dateSubmit(new Date().toISOString().substr(0, 10)),
            atendimentosDay:[],
            colorButton:'success',
            textButton:'Atendido',
            trClass:'green lighten-4'
       }
    },
    watch:{
        date(val){
          this.dateAtendimento = this.dateSubmit(val)
          this.dateFormatted = this.formatDate(val)
        },
        dateAtendimento(val){
          this.getAtendimentos(val)
        }
    },
    methods:{
        dateSubmit(date) {
            return moment(date).format()
        },
        formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${day}/${month}/${year}`
        },
        async getAtendimentos(date=this.dateAtendimento){
         this.atendimentosDay = await AtendimentoService.getAtendimentosProfissionalData(this.profissionalName, date)
        },
        changeStyle(index){
          let elemento = document.getElementById(`${index}`)
            elemento.style.backgroundColor='#C8E6C9'
            elemento.children[5].children[0].children[0].innerHTML = 'Atendido'
            elemento.children[5].children[0].classList.replace('info','success')
        },
        changeStatus(atendimentoID, index){
          AtendimentoService.setAttended(atendimentoID)
            .then(resp=>{
              this.$swal.fire({
                text:resp.data.message ,
                type: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Ok'
              })
            })
            .then(()=>this.changeStyle(index))  
        },
        deleteAtendimento(atendimentoID, index){
              this.$swal.fire({
                title: `Deseja apagar o atendimento?`,
                  type: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  confirmButtonText: 'Sim',
                  cancelButtonColor: '#d33',
                  cancelButtonText: 'Cancelar'
              }).then(result=>{
                if (result.value) {
                  AtendimentoService.deleteAtendimento(atendimentoID)
                    .then(resp => {
                      this.$swal.fire({
                        title: resp.data.message,
                        type: 'success',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Ok'
                      })
                    })
                }
                this.atendimentosDay.splice(index, 1);
              })
        }

        
    }
}
</script>

<style>

</style>
