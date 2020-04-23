<template>
    <div>
        <q-card>
            <q-card-title>
                <h3 class="q-my-none">Cadastro da Planilha de  Riscos</h3>
            </q-card-title>
            <q-card-separator />
            <q-card-main>
                <div class="q-mb-xs row no-wrap">
                    <q-field class="col-sm-10">
                        <q-input inverted float-label="Nome da Planilha" color="secondary" v-model="planilha.nomePlanilha"
                        @blur="$v.planilha.nomePlanilha.$touch"
                        :error="$v.planilha.nomePlanilha.$error"
                         >
                            <q-autocomplete
                                @search="findPlanilha"
                                @selected="selected"
                                :debounce ="1000"
                                :value-field = "planilhas=>`${planilhas.nomePlanilha}`"
                            />
                         </q-input>

                    </q-field>
                </div>
                <div class="q-mb-xs row gutter-xs">
                    <q-field class="col-sm-8 col-xs-12">
                        <q-input float-label="Médico Coordenador" inverted color="secondary" v-model="planilha.medicoCoordenador.nome"  upper-case />
                    </q-field>
                    <q-field helper="Informe o estado do Conselho" class="col-sm-2 col-xs-8">
                        <q-input float-label="CRM/RQE/CREMEC"  inverted color="secondary" v-model="planilha.medicoCoordenador.conselho" upper-case/>
                    </q-field>
                </div>
                <div class="row">
                    <div  v-for="(setor,index) in planilha.setores" :key="index" class="col-sm-10">
                        <q-field >
                            <q-input float-label="Setor" v-model="planilha.setores[index].nomeSetor" inverted upper-case/>
                        </q-field>
                        <div class="funcoes q-my-lg">
                            <q-input float-label="Funções"
                            v-model="funcoes"
                            inverted upper-case
                            @keydown.13="pushFuncoesPlanilha(planilha.setores[index].funcoes,funcoes)"
                            :after="[{icon:'subdirectory_arrow_left'}]"
                            />
                            <q-list v-for="(funcao, index2) in planilha.setores[index].funcoes" :key="index2" class="q-ma-xs col-12" >
                                <q-item  >
                                    <q-item-main ><strong>{{funcao}}</strong></q-item-main>
                                    <q-item-side >
                                        <q-btn icon="clear" flat size="xs" class="absolute-top-right" @click="popElemento(planilha.setores[index].funcoes, index2)"/>
                                    </q-item-side>
                                </q-item>
                            </q-list>
                        </div>

                        <div  class="q-mt-lg col-12">
                        <q-table
                            dense
                            hide-bottom
                            title="Riscos Ocupacionais"
                            :pagination.sync = "pagination"
                            :data="planilha.setores[index].riscos"
                            :columns="[{ name:'codigo', label:'Codigo', align:'center'}, {name:'fator',label:'Fator de Risco', align:'center'},
                            {name:'agente',label:'Agente de Risco', align:'center'}, {name:'clear',label:'Remover', align:'center'}]"
                            row-key="codigo"
                        >
                            <template slot="body" slot-scope="props" >
                                <q-tr :props="props">
                                    <q-td  key="codigo" :props="props">
                                        {{props.row.codigo}}
                                    </q-td>
                                    <q-td  key="fator" :props="props">
                                        {{props.row.fator}}
                                    </q-td>
                                    <q-td  key="agente" :props="props">
                                        {{props.row.agente}}
                                    </q-td>
                                    <q-td key="clear" :props="props">
                                        <q-btn flat icon="clear" size="xs" color="negative" @click="popElemento(planilha.setores[index].riscos, props.row.__index)"/>
                                    </q-td>
                                </q-tr>
                            </template>

                        </q-table>
                    </div>
                    <q-field>
                    <q-btn @click="openTableRiscos(index)"  color="secondary">Riscos Ocupacionais</q-btn>
                    </q-field>
                    </div>
                    <div class="self-start q-ml-lg" >
                        <q-btn-group push  >
                            <q-btn push @click="increaseItem(planilha.setores)" color="secondary" size="xs">
                                <q-icon name="add"  />
                            </q-btn>
                            <q-btn push @click="decreaseItem(planilha.setores, index)" :disable="planilha.setores.length <=1 " color="secondary" size="xs">
                                <q-icon name="remove" />
                            </q-btn>
                        </q-btn-group>
                    </div>
                </div>
                <q-modal v-model="showRiscos" :content-css="{width: '80vw'}">
                <q-modal-layout>
                    <q-toolbar slot="header">
                    <q-toolbar-title>
                        Riscos Ocupacionais
                    </q-toolbar-title>
                    <q-btn
                        flat
                        round
                        dense
                        v-close-overlay
                        icon="clear"
                    />
                    </q-toolbar>
                </q-modal-layout>
                <div class="q-mt-xl">
                    <riscos/>
                </div>
                <q-btn class="full-width" rounded push color="secondary" @click="setedRiscosSelected" v-close-overlay>Selecionar Riscos</q-btn>
                </q-modal>
            </q-card-main>
            <q-card-actions>
                <q-btn rounded  push
                  icon="edit"
                  color="warning"
                  @click="updatePlanilha"
                  class="full-width q-pt-xs q-mb-sm"
                  :disable ="$v.$invalid"
                  label="Editar"
                  >
                    <q-tooltip v-if="$v.$invalid" >
                      Verifique os campos Obrigatorios!
                    </q-tooltip>
                </q-btn>
                <q-btn rounded  push
                  icon="save"
                  color="secondary"
                  @click="savePlanilha"
                  class="full-width q-pt-xs "
                  :disable ="$v.$invalid"
                  label="Salvar Nova Planilha"
                  >
                    <q-tooltip v-if="$v.$invalid" >
                      Verifique os campos Obrigatorios!
                    </q-tooltip>
                </q-btn>
            </q-card-actions>
        </q-card>
    </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { PlanilhaRisco } from '../../interfaces/planilhaRiscos.class.js'
export default {
    created(){

    },
    components:{
        Riscos: () => import('../../components/Riscos/TableRiscos.vue')
    },
    data(){
        return{
            planilha: new PlanilhaRisco(),
            showRiscos:false,
            funcoes:'',
            planilhas:[],
            pagination:{page:1, rowsPerPage:30},
            index: 0
        }
    },
    methods: {
        increaseItem(array){
           array.push({nomeSetor:'',funcoes:[],riscos:[]})
        },
        decreaseItem(array, index){
            array.pop(index-1)
        },
        setedRiscosSelected(){
            this.$root.$emit('setedRiscos');
            this.planilha.setores[this.index].riscos = this.planilha.setores[this.index].riscos.concat(this.$store.state.storeMain.riscosSelected )


        },
        savePlanilha(){
            this.$axios.post('common/planilhariscos/add', this.planilha)
                .then( resp => this.$swal.fire({title:'Planilha gravada com sucesso', type:'success'}))
                .finally(_ => this.planilha = new PlanilhaRisco())
        },
        pushFuncoesPlanilha(array, value){
            array.push(value)
            this.funcoes = ''
        },
        popElemento(array, index){
            array.splice(index, 1)
        },
        async findPlanilha(terms, done){
            let planilhas = []
            planilhas = await this.$axios.get(`/common/planilhariscos/${terms}`)
            done(this.planilhas = this.createListPlanilhaLabel(planilhas.data))
        },

        createListPlanilhaLabel(planilhas){
            return planilhas.map(planilha=>{
                return {
                    label:planilha.nomePlanilha,
                    value:planilha
                }
            } )
        },

        selected(item){
            this.planilha = item.value
        },
        openTableRiscos(index){
            this.index = index
            this.showRiscos = true
        },
        updatePlanilha(){
            this.$axios.put(`/common/planilhariscos/${this.planilha._id}`, this.planilha)
                .then(this.$swal.fire({
                    text:'Planilha de riscos atualizada com sucesso!',
                    type:'success'
                }))
        }
    },
    validations:{
       planilha:{
            nomePlanilha:{ required }
        }
    }
}
</script>

<style>
.funcoes{
    display: flex;
    flex-wrap: wrap;
}
.funcao {
    margin:3px;
}


</style>
