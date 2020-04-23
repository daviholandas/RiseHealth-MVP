<template>
   <v-container fluid grid-list-lg class="jumbotron">
          <v-layout>
              <v-flex sm12>
                <v-card>
                    <v-flex sm2 xs5 ma-1 pt-5 pb-0>
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
                    <v-flex xs12 sm12 class="ma-1 pb-0">
                    <v-autocomplete
                        v-model="empresa"
                        :items="empresasForLabel(empresas)"
                        :search-input.sync="searchEmpresa"
                        hide-no-data
                        item-text="label"
                        label="Empresa"
                        return-object
                        prepend-icon="business"
                        append-icon="search"
                        outline
                        v-debounce:300ms="findEmpresas"
                        @blur="$v.empresa.$touch"
                        :error="$v.empresa.$error" 
                    ></v-autocomplete>
                    </v-flex>
                    <v-flex xs12 sm12 class="ma-1 pt-0 pb-0">
                    <v-autocomplete
                        v-model="ficha.colaborador"
                        :items="colaboradores"
                        item-text="nome"
                        :search-input.sync="searchColaborador"
                        label="Colaborador"
                        return-object
                        prepend-icon="fas fa-user-tie"
                        append-icon="search"
                        outline
                        v-debounce:300ms="getColaboradores"
                         @blur="$v.ficha.colaborador.$touch"
                        :error="$v.ficha.colaborador.$error"     
                    >
                        <template v-slot:no-data>
                            <v-list-tile>
                                <v-btn flat color="green" @click="addPacienteDialog=true">Adicionar Colaborador</v-btn>
                            </v-list-tile>
                        </template>
                    </v-autocomplete>
                    </v-flex>
                    <v-layout class="ma-1 pt-0">
                    <v-flex xs12 sm4 d-flex >
                        <v-select
                        :items="funcoes"
                        item-text="funcoes"
                        label="Função"
                        outline
                        prepend-icon="fas fa-tools"
                        v-model="funcao"
                        @blur="$v.ficha.funcao.$touch"
                        :error="$v.ficha.funcao.$error" 
                        ></v-select>
                    </v-flex>
                    <v-flex xs12 sm4 d-flex >
                        <v-select
                        :items="periodicidade"
                        label="Periodicidade"
                        outline
                        prepend-icon="fas fa-calendar-plus"
                        v-model="ficha.periodicidade"
                        @blur="$v.ficha.periodicidade.$touch"
                        :error="$v.ficha.periodicidade.$error"    
                        ></v-select>
                    </v-flex>
                    <v-flex xs12 sm4 d-flex >
                        <v-text-field outline label="Tempo de Serviço" prepend-icon="fas fa-hourglass-start" v-model="ficha.tempoServico"/>
                    </v-flex>
                    </v-layout>
                    <v-layout>
                        <v-flex>
                           <exames-table />
                        </v-flex>
                        <v-flex mt-3 xs12 sm5>
                          <h2>Exames Selecionados:</h2>
                            <v-list  v-for="(exame, index) in ficha.exames" :key="index">
                                <v-divider></v-divider>
                                <v-list-tile subheader>
                                    {{exame.nome}}
                                    <v-subheader>{{exame.categoria}}</v-subheader>
                                    <v-spacer></v-spacer>
                                    <v-list-tile-avatar><v-btn @click="removeExameSelected(index)" flat icon><v-icon>clear</v-icon></v-btn></v-list-tile-avatar>
                                </v-list-tile>
                                <v-divider></v-divider>
                            </v-list>
                        </v-flex>
                    </v-layout>
                    <v-card-actions>
                        <v-btn block color="success" @click="salvarFicha" :disabled="$v.$invalid" >Salvar</v-btn>
                    </v-card-actions>
                </v-card>
              </v-flex>
          </v-layout>
         <div v-if="printFicha">
           <ficha-template/>
         </div>
         <div>
            <v-dialog v-model="addPacienteDialog">
                <v-toolbar color="teal lighten-2" >
                    <v-toolbar-title class="white--text">Cadastro Colaborador</v-toolbar-title>
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
import EmpresaService from '../../services/EmpresaService.js'
import PacienteService from '../../services/PacienteService'
import OcupacionalService from '../../services/OcupacionalService'
import FichaOcupacional from '../../interfaces/fichaOcupacional.class.js'
import { required, minLength } from 'vuelidate/lib/validators'
import {EventBus} from '@/event-bus.js'
export default {
    components:{
        ExamesTable: () => import('../../components/Ocupacional/ExamesTable'),
        FichaTemplate:() => import('../../templates/FichaOcupacional'),
        CadastroPaciente: () =>  import('../Paciente/CadastroPaciente.vue')
    },
    data(vm){
        return {
            date: new Date().toISOString().substr(0, 10),
            dateFormatted:vm.formatDate(new Date().toISOString().substr(0, 10)),
            menu1: false,
            disabled:true,
            empresa:null,
            empresas:[],
            searchEmpresa:null,
            colaborador:null,
            colaboradores:[],
            searchColaborador:null,
            funcoes:[],
            periodicidade:[{text:'Admissional'},{text: 'Periódico'}, {text:'Mudança de Função'},{text: 'Demissional'}],
            ficha:new FichaOcupacional(),
            exames:[],
            funcao:{},
            printFicha: false,
            addPacienteDialog:false
        }
    },
    created(){
        EventBus.$on('selectedExames', exames => this.ficha.exames = exames)
        this.ficha.dateRegistered = this.dateSubmit(this.date)
    },
    watch:{
        date(){
          this.dateFormatted = this.formatDate(this.date)
          this.ficha.date = this.dateSubmit(val)
        },
        empresa(value){
            this.splitFuncoes(value)
            this.ficha.empresa = value._id
        },
        funcao(value){
            this.filterRiscosFuncao(value)
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
      findEmpresas(){
        EmpresaService.GetEmpresas(this.searchEmpresa)
        .then(empresas => this.empresas = empresas.data)
        .finally(() => (this.isLoading1 = false))
      },
      empresasForLabel(empresas){
        return empresas.map(empresa =>{
           return Object.assign(empresa,{label:`${empresa._id.cnpj} - ${empresa._id.fantasia}` })
        })
      },
      getColaboradores(){
          PacienteService.getColaboradores(this.searchColaborador)
            .then(colaboradores=>this.colaboradores = colaboradores.data)
      },
      splitFuncoes(empresa){
          empresa.InfoOcupacionais.map(funcoes => this.funcoes.push(funcoes))
      },
      salvarFicha(){
         this.$swal.fire({
                    text:'Deseja imprimir ficha?',
                    type: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Sim',
                    cancelButtonColor: '#d33',
                    cancelButtonText: 'Não',
                }).then(result=>{
                    if(result.value){
                        this.$store.dispatch('setFichaOcupacional', this.ficha)
                        this.printFicha = true
                        setTimeout(() => {
                            this.printFichaOcupacional()
                        }, 3000);
                        OcupacionalService.saveFichaAtendimento(this.ficha)
                            .then(this.ficha = new FichaOcupacional())
                    }else{
                        OcupacionalService.saveFichaAtendimento(this.ficha)
                            .then(resp => this.$swal.fire({
                                text:resp.data.message,
                                type:'success'
                            }))
                            .then(this.ficha = new FichaOcupacional())
                    }
                })
                
      },
      removeExameSelected(index){
          this.ficha.exames.splice(index,1)
      },
      filterRiscosFuncao(funcaoSelected){
        
        this.funcoes.map(funcao => {
            if(funcao.funcoes == funcaoSelected){
               this.ficha.funcao = funcao 
            }
        })
      },
      printFichaOcupacional(){
          this.$htmlToPaper("ficha")
      }

    },
    validations:{
        ficha:{
            colaborador:{required},
            funcao:{required},
            periodicidade:{required},
            exames:{required, minLength:minLength(1)}
        },
        empresa: {required}
    }

}
</script>

<style scoped>
    .jumbotron{
        background-color: #E0F2F1;
    }
</style>
