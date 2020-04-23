<template>
    <div class="toolbar">
        <v-card-title>
            <v-flex xs10 lg2 pt-4 pb-0>
                <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition"
                    offset-y full-width max-width="290px" min-width="290px">
                    <v-text-field slot="activator" outline v-model="dateFormatted" label="Data" prepend-icon="event"></v-text-field>
                    <v-date-picker v-model="date" no-title @input="menu1 = false" locale="pt"></v-date-picker>
                </v-menu>
            </v-flex>
            <v-flex  xs12 lg5 pt-4 pl-2>
                <v-text-field
                    v-model="colaborador"
                    outline
                    label="Nome do Colaborador"
                    prepend-inner-icon="search"
                    clearable
                    append-icon="keyboard_return"
                    @keypress.enter="getFichas('')"
                > 
                </v-text-field>
            </v-flex>
            <v-flex  xs12 lg5 pt-4 pl-2>
                <v-text-field
                    v-model="empresa"
                    outline
                    label="Nome do Empresa"
                    prepend-inner-icon="search"
                    clearable
                    append-icon="keyboard_return"
                    @keypress.enter="getFichas(null, null)"
                > 
                </v-text-field>
            </v-flex>
        </v-card-title>
        <v-data-table 
            :headers="headers" 
            :items="atendimentosALL"  
            class="elevation-1"
            rows-per-page-text="Itens por pagina" 
            :rows-per-page-items="propsTables"
            :expand="expand" 
            item-key="colaborador.nome"
        >

            <template slot="items" slot-scope="props">
                <tr>
                    <td class="text-xs-center">{{props.item.dateRegistered | dataFormated}} </td>
                    <td class="text-xs-center font-weight-black">{{props.item.colaborador.nome}} </td>
                    <td class="text-xs-center caption">{{props.item.empresa.nome}}({{props.item.empresa.fantasia}})</td>
                    <td class="text-xs-center" @click="props.expanded = !props.expanded">{{props.item.periodicidade}}</td>
                    <td class="text-xs-center">
                        <v-select
                            v-model="props.item.status"
                            :items="status"
                            background-color="warning"
                            @change="setStatus(props)"
                            />
                    </td>
                    <td class="text-xs-center">
                        <v-menu offset-y>
                          <template v-slot:activator="{ on }">
                            <v-btn flat icon v-on="on">
                            <v-icon medium color="teal" >
                              print
                            </v-icon>
                            </v-btn>
                          </template>
                          <v-list>
                            <v-list-tile @click="printFicha(props.item)">
                            <strong>
                                <v-icon>insert_drive_file</v-icon>
                                Ficha de Atendimento
                            </strong> 
                            </v-list-tile>
                            <v-list-tile @click="printAso(props.item)">
                            <strong>
                                <v-icon>assignment_ind</v-icon>
                                ASO
                            </strong> 
                            </v-list-tile>
                          </v-list>
                        </v-menu>
                    </td>
                </tr>
            </template>
            <template v-slot:expand="props">
                <v-list>
                    <v-list-tile-title class="ml-3">
                        <h3>Exames Solicitados:</h3>
                    </v-list-tile-title>
                    <v-list-tile v-for="(exame, index) in props.item.exames" :key="index">
                      <strong>{{exame.nome}}</strong> - {{exame.categoria}}
                    </v-list-tile>
                </v-list>
            </template>
        </v-data-table>
        <div v-show="false">
            <div v-if="showAso">
                <aso/>
            </div>
            <div v-if="fichaPrint">
            <ficha-template/>
            </div>
        </div>
    </div>
</template>

<script>
import OcupacionalService from '../../services/OcupacionalService.js'
import moment from 'moment'
    export default {
        components:{
            Aso: ()=>import('../../templates/ASO'),
            FichaTemplate:() => import('../../templates/FichaOcupacional')
        },
        data(vm){
            return {
                headers: [
                { text: 'Data Cadastro', value:'dateRegistered', align:'center',sortable: false },
                { text: 'Colaborador', value:'colaborador.nome', align:'center',sortable: false },
                { text: 'Empresa', value: 'empresa.nome', align:'center',sortable: false },
                { text: 'Tipo de Exame', value:'periodicidade', align:'center',sortable: false },
                { text: 'Status', value:'', align:'center',width:'200',sortable: false },
                { text: 'ASO / Ficha', value:'', align:'center',sortable: false }
                ],
                status:[
                    {text:"Atendido", value:"ATENDIDO"},
                    {text:"Não Atendido", value:"NOTATENDIDO"}
                ],
                propsTables:[10,15,20,{ "text": "$vuetify.dataIterator.rowsPerPageAll", "value": -1 },],
                date:new Date().toISOString().substr(0, 10),
                dateFormatted:vm.formatDate(new Date().toISOString().substr(0, 10)),
                dateAtendimento:vm.dateSubmit(new Date().toISOString().substr(0, 10)),
                menu1:false,
                atendimentosALL:[],
                colaborador:null,
                empresa:null,
                expand: false,
                showAso:false, 
                fichaPrint:false
            }
        },
        created(){
            this.getFichas()
        },
         watch:{
            date(val){
                this.dateAtendimento = this.dateSubmit(val)
                this.dateFormatted = this.formatDate(val)
            },
            dateAtendimento(val){
                this.getFichas(val)
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
            getFichas(date = this.dateAtendimento, colaborador=this.colaborador, empresa=this.empresa){
                OcupacionalService.getFichasOcupacionais(date, colaborador, empresa)
                    .then(resp=>this.atendimentosALL = resp.data)
            },
            printAso(ficha){
               this.$store.dispatch('setASO',ficha)
               this.$swal.fire({
                    text:'O que deseja fazer quanto ao ASO?',
                    type: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#4DB6AC',
                    confirmButtonText: 'Visualizar',
                    cancelButtonColor: '#FFCA28',
                    cancelButtonText: 'Imprimir',
                    })
                    .then(result=>{
                        if(result.value){
                            this.$router.push('/ocupacional/printAso')
                        }else{
                            this.showAso = true
                            setTimeout(() => {
                                this.$htmlToPaper("aso",()=>this.showAso = false)
                            }, 2000);
                        }
                    })
            },
            printFicha(ficha){
                this.$store.dispatch('setFichaOcupacional',ficha)
                this.fichaPrint = true
                setTimeout(() => {
                    this.$htmlToPaper("ficha",()=>this.fichaPrint=false)
                }, 3000);
            },
            setStatus(props){
              if(this.atendimentosALL[props.index].status == 'NOTATENDIDO'){
                  this.$swal.fire({
                        text:'Deseja realmente mudar o status?',
                        type: 'question',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Sim',
                        cancelButtonColor: '#d33',
                        cancelButtonText: 'Não',
                    }).then(result=>{
                        if(result.value){
                            OcupacionalService.chageStatus(props.item._id, props.item)
                                .then(this.$swal.fire({text:'Status modificado com sucesso!', type:'success'}))
                        }
                    })
              }else{
                  OcupacionalService.chageStatus(props.item._id, props.item)
                      .then(this.$swal.fire({text:'Status modificado com sucesso!', type:'success'}))
              }
            }
        }
    }
</script>

<style scoped>
.attend{
    color: red;
    font-size: 1.5em;
}

.attended{
    color: #4CAF50;
    font-size: 1em;
}

</style>
