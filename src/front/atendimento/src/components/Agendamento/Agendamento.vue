<template>
      <v-container fluid grid-list-lg class="jumbotron">
           <v-fab-transition v-if="agendaModel.date &&  agendaModel.profissional.nome">
              <v-btn
                color="pink"
                dark
                absolute
                down
                right
                fab
                @click="dialog=true"
              >
                <v-icon>event</v-icon>
              </v-btn>
            </v-fab-transition>
          <v-layout align-center justify-space-start row>
            <v-card width="350"   >
                  <v-card-title class="headline teal lighten-2">
                      <h3>Agendar</h3>
                  </v-card-title>
                 <v-flex xs10  pt-4 pb-0>
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
                <v-flex xs12 pt-0 pb-0 >
                    <v-autocomplete
                        v-model="profissional"
                        :items="profissionais"
                        :loading="isLoading1"
                        :search-input.sync="searchProfissional"
                        hide-no-data
                        item-text="nome"
                        hide-selected
                        label="Profissional"
                        return-object
                        prepend-icon="fas fa-user-md"
                        append-icon="search"
                        outline
                    ></v-autocomplete>
                </v-flex>
                <v-flex xs12 pt-0 pb-0 >
                    <v-autocomplete
                        v-model="paciente"
                        :items="pacientes"
                        :loading="isLoading"
                        :search-input.sync="searchPaciente"
                        item-text="nome"
                        hide-selected
                        label="Paciente"
                        return-object
                        prepend-icon="fas fa-user"
                        append-icon="search"
                        outline
                    >
                    <template v-slot:no-data>
                    <v-list-tile>
                        <v-btn flat color="green" @click="addPacienteDialog=true">Adicionar Paciente</v-btn>
                    </v-list-tile>
                    </template>
                    </v-autocomplete>
                </v-flex>
                <v-flex xs12 pt-0 >
                    <v-select
                        v-model="agendaModel.consulta"
                        :items="procedimentos"      
                        item-text= "procedimento"
                        return-object
                        multiple
                        outline
                        label="Procedimentos"
                        :disabled ="disabled"
                        prepend-icon="healing"
                        height="20"
                    ></v-select>
                </v-flex>
              </v-card>
              <v-card  v-if="paciente && profissional"  class="cardInformacoes">
                    <v-card-title primary-title class="headline teal lighten-2">
                      <h3>Consulta:</h3> <strong class="ml-2">{{profissional.nome | nomeComposto}}({{profissional.especialidade}})</strong> <div class="dataHead "> <h4 class="mr-2">Data:</h4>{{dateFormatted}}</div>
                    </v-card-title>
                   <v-divider light></v-divider>
                    <div >
                    <v-card-text>
                     <strong class="mr-2">Paciente:</strong>{{paciente.nome}}
                     <strong class="ml-2 mr-2">Data de Nascimento:</strong>{{paciente.nascimento }}
                     <strong class="ml-2 mr-2">Idade:</strong>{{paciente.nascimento | idade}} anos
                     <strong class="ml-2 mr-2">Sexo:</strong>{{paciente.sexo }}
                    </v-card-text>
                    <v-divider light></v-divider>
                    <v-card-text>
                      <strong>CPF:</strong> {{paciente.documentos.cpf | toCPF}}
                      <strong class="ml-2">Telefone:</strong> {{paciente.telefone | toPhone}}
                      <strong class="ml-2">Convenio:</strong> {{paciente.convenio.nome}}
                    </v-card-text>
                    <v-divider light></v-divider>
                    </div>
                    <v-card-title>
                      <h3>Procedimentos:</h3>
                    </v-card-title>
                    <div >
                    <v-list v-for="(procedimento,index) in agendaModel.consulta" :key="index">
                        <v-flex pt-0 pb-0>
                        <v-divider light></v-divider>
                        <v-list-tile>
                            {{procedimento.procedimento}}  <v-spacer></v-spacer> R$ {{procedimento.valor | moeda}}
                        </v-list-tile>
                        <v-list-tile class="discount">
                            <v-spacer/> {{messageDesconto}} - R$ {{discount(index) | moeda}}
                        </v-list-tile>
                        <v-divider light></v-divider>
                        </v-flex>
                    </v-list>
                    <v-card-text  class=" elevation-10 " id="total">
                     <strong>Total:</strong> <strong class="ml-2">R${{valorLiquidoConsulta() | moeda}}</strong>
                    </v-card-text>
                    
                    <v-card-actions>
                        <v-btn color="success" @click="makeAgenda">
                            Agendar
                            <v-icon right>fas fa-check</v-icon> 
                        </v-btn>
                    </v-card-actions>   
                    </div>
              </v-card>
          </v-layout>
           <div class="text-xs-center">
            <v-dialog
            v-model="dialog"
            width=1500
            >
            <v-card >
                <v-card-title
                class="headline teal lighten-2"
                primary-title
                >
                Agenda de {{agendaModel.profissional.nome | nomeComposto }} dia {{ dateFormatted }}
                </v-card-title>

                <v-card-text v-if="dialog">
                    <agenda :agenda="agendaModel" />
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="primary"
                    flat
                    @click="dialog = false"
                >
                    Fechar
                </v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
        </div>
        <div>
            <v-dialog v-model="addPacienteDialog">
                <v-toolbar color="teal lighten-2" >
                    <v-toolbar-title class="white--text">Cadastro Paciente</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon  @click="addPacienteDialog = false">
                       <v-icon color="white" large>close</v-icon> 
                    </v-btn>
                </v-toolbar>
                <div v-if="addPacienteDialog">
                <cadastro-paciente/>
                </div>
            </v-dialog>
        </div>
      </v-container>
</template>

<script>
import moment from 'moment';
import ProfissionalService from '../../services/ProfissionalService.js';
import PacienteService from '../../services/PacienteService.js';
import AgendaService from '../../services/AgendaService.js';
export default {
    components:{
        Agenda: () => import('./Agenda') ,
        CadastroPaciente: () =>  import('../Paciente/CadastroPaciente.vue')
    },
    data(vm){
        return {
            date: new Date().toISOString().substr(0, 10),
            dateFormatted:vm.formatDate(new Date().toISOString().substr(0, 10)),
            menu1: false,
            disabled:true,
            profissional:null,
            profissionais:[],
            searchProfissional:null,
            isLoading:false,
            isLoading1:false,
            paciente:null,
            pacientes:[],
            searchPaciente:null,
            agendaModel:{
                profissional:{},
                date:Date,
                pacienteID:'',
                consulta:[]
            },
            dialog:false,
            addPacienteDialog:false,
            messageDesconto:''
        }
    },
    created(){
        this.agendaModel.date = moment(this.date).format()
    },
    watch:{
        date(val){
          this.dateFormatted = this.formatDate(this.date)
          this.agendaModel.date = moment(val).format() 
        },
        searchProfissional(){
            this.isLoading1 = true
            ProfissionalService.profissionaisQuery()
                .then(profissionais =>{
                    this.profissionais = profissionais.data.data.profissionais
                })
                .finally(() => (this.isLoading1 = false))
            
        },
        searchPaciente(val){
            this.isLoading = true
            PacienteService.pacientesAutocomplete(val)
                .then(pacientes => this.pacientes = pacientes.data.data.pacienteSearch)
                .finally(() => (this.isLoading = false))
        },
        profissional(val){
            this.disabled = false
            this.agendaModel.profissional.nome = val.nome
            this.agendaModel.profissional.conselho = val.conselhoProfissional
            this.agendaModel.consulta = []
        },
        paciente(val){
           this.agendaModel.pacienteID = val.id
        }
    },
    computed:{
        procedimentos(){
            if(!this.profissional){
                return []
            }else{
                return this.profissional.procedimentos
            }
        }
    },
    methods:{
        dateSubmit (date) {
            return moment(date).format()
        },
        formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${day}/${month}/${year}`
      },
      makeAgenda(){
          AgendaService.CreateAgenda(this.agendaModel)
            .then(resp =>{
                this.$swal.fire({
                        text:resp.data.message,
                        type: 'success',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Ok'
                })
                this.dialog = true
            })
        
      },
      valorBrutoConsulta(){
          return this.agendaModel.consulta.reduce((sum, {valor})=>sum + valor,0)
      },
      valorLiquidoConsulta(){
          switch(this.paciente.convenio.nome){
            case 'Sem Convenio':
                this.agendaModel.valorConsulta = this.valorBrutoConsulta()  * 1
                return this.agendaModel.valorConsulta
            case 'Cartão Fidelidade':
                this.agendaModel.valorConsulta =  this.valorBrutoConsulta() - (this.valorBrutoConsulta() * this.paciente.convenio.valor)
                return this.agendaModel.valorConsulta
            case 'Plano Funerario':
                if(this.valorBrutoConsulta() <= 0) return 0
                this.agendaModel.valorConsulta = this.valorBrutoConsulta() - this.paciente.convenio.valor
                return this.agendaModel.valorConsulta
          }
      },
      discount(index){
          switch(this.paciente.convenio.nome){
            case 'Sem Convenio':
                this.agendaModel.consulta[index].valorLiquidoProcedimento = this.agendaModel.consulta[index].valor
                this.messageDesconto = ''
                return  0
            case 'Cartão Fidelidade':
                this.agendaModel.consulta[index].valorLiquidoProcedimento = this.agendaModel.consulta[index].valor - ( this.agendaModel.consulta[index].valor * this.paciente.convenio.valor )
                this.messageDesconto = "Tem desconto devido ao Cartão Fidelidade- 5%"
                return this.agendaModel.consulta[index].valor * this.paciente.convenio.valor
            case 'Plano Funerario':
                this.agendaModel.consulta[index].valorLiquidoProcedimento = this.agendaModel.consulta[index].valor - this.paciente.convenio.valor
                this.messageDesconto = "Tem desconto devido ao Plano Funerario - R$10,00"
                return  this.agendaModel.consulta[index].valorLiquidoProcedimento
          }
      }
       
    }

}
</script>

<style scoped>
    .jumbotron{
        background-color: #E0F2F1;
    }
    
    .cardInformacoes{
        margin-left: 50px;
        margin-top: 10px;
        width: 70%;
    }
    .dataHead{
        margin-left: 80px;
        display: inline-flex;
    }

    #total{
        width:210px;
        font-size: 1.5rem;
        position: relative;
        left: 70%;
    }

    .discount{
        color:red;
        font-size: 13px;
    }

</style>
