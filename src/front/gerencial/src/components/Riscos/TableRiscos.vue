<template>
    <div>
        <q-card>
            <q-card-main>
                <div class="row justify-start">
                    <q-field class="col-sm-5">
                        <q-select :options="agentes" v-model="agente" inverted />
                    </q-field>
                    <q-field class="q-ml-lg">
                       <q-checkbox v-model="isEsocial"  label="E-social" />
                    </q-field>
                    <div class="q-ml-lg">
                        <q-btn flat color="secondary" icon="add" @click="addRiscos = true">Adicionar Risco</q-btn>
                    </div>
                </div>
                <div class="q-mt-lg">
                    <q-table
                        :data="riscos"
                        separator="cell"
                        row-key="_id"
                        selection="multiple"
                        :selected.sync="selected" 
                        :columns="columns"
                        :filter="filter"      
                        :filter-method="filtro"
                    >
                       <template slot="top-right" slot-scope="props">
                            <q-search hide-underline v-model="terms" />
                        </template>
                        <template slot="body" slot-scope="props">
                        <q-tr :props="props">
                            <q-td auto-width key="check">
                                <q-checkbox color="primary" v-model="props.selected" />
                            </q-td>
                            <q-td key="CODIGO" :props="props">
                            {{ props.row.CODIGO }}
                            </q-td>
                            <q-td key="FATOR_DE_RISCO" :props="props">
                                {{ props.row.FATOR_DE_RISCO}}
                            </q-td>
                        </q-tr>
                        </template>
                        <template slot="top-right" slot-scope="props">
                            <q-search hide-underline v-model="filter" />
                        </template>
                    </q-table>
                </div>
            </q-card-main>
        </q-card>

        <q-modal v-model="addRiscos" :content-css="{width: '80vw',  height: '70vh'}">
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
            <div id="addRisco">
                <riscos/>
            </div>
        </q-modal>
    </div>
</template>

<script>
export default {
    created(){
        this.$root.$on('setedRiscos',this.setRiscosSelected)
    },
    components:{
        Riscos: () => import('../../pages/Ocupacional/Riscos')
    },
    data(){
        return{
            agentesEsocial:[
                {label:'Fisícos',value:"FISICO"},
                {label:'Químicos', value:"QUIMICO"},
                {label:'Biológicos', value:"BIOLOGICO"},
                {label:'Ergonômicos Biomecanicos', value:"ERGONOMICOS_BIOMECANICOS"},
                {label:'Ergonômicos Mobiliario e Equipamentos', value:"ERGONOMICOS_MOBILIARIO_EQUIPAMENTOS"},
                {label:'Ergonômicos Organizacionais', value:"ERGONOMICOS_ORGANIZACIONAIS"},
                {label:'Ergonômicos Ambientais', value:"ERGONOMICOS_AMBIENTAIS"},
                {label:'Ergonômicos Psicossociais Cognitivos', value:"ERGONOMICOS_PSICOSSOCIAIS_COGNITIVOS"},
                {label:'Acidente/Mecânico', value:"ACIDENTE"},
                {label:'Perigosos', value:"PERIGOSOS"},
                {label:'Associação de Fatores de Risco', value:"ASSOCIACAO_FATORES_RISCO"},
                {label:'Outros', value:"OUTROS"},
                {label:'Ausencia de Fatores de Riscos', value:"AUSENCIA_FATORES_RISCO"}
            ],
            agentes:[
                {label:'Fisícos',value:"FISICO"},
                {label:'Químicos', value:"QUIMICO"},
                {label:'Biológicos', value:"BIOLOGICO"},
                {label:'Ergonômicos', value:"ERGONOMICO"},
                {label:'Outros', value:"OUTROS"},
                {label:'Acidente/Mecânico', value:"ACIDENTE"}
            ],
            isEsocial:false,
            agente:'',
            riscos:[],
            selected:[],
            columns:[
                {name:"CODIGO", label:'Codigo', align:'center'},
                {name:"FATOR_DE_RISCO", label:'Fator de Risco', align:'center'}
            ],
            filter:'',
            addRiscos:false
        }
    },
    methods:{
        getRiscos(){
            if(this.isEsocial){
                this.$axios.get(`common/riscos/agenteEsocial/${this.agente}`)
                    .then(riscos => this.riscos = riscos.data)
            }else{
                this.$axios.get(`common/riscos/agente/${this.agente}`)
                    .then(riscos =>this.riscos = riscos.data)
            }
        },
        setRiscosSelected(){
            this.$store.dispatch('storeMain/setRiscosSelected', this.sortingSelected(this.selected))
            this.selected = new Array();
        }, 
        sortingSelected(array){
            let array2 = array.map(elemento => {
                return {codigo: elemento.CODIGO, fator: elemento.FATOR_DE_RISCO, agente: elemento.AGENTE_RISCO.replace(/_/gi , ' ')}})
            return array2.sort(function (a, b) {
                if (a.agente > b.agente) {
                    return -1;
                }
                if (a.agente < b.agente) {
                    return 1;
                }
                // a must be equal to b
                return 0;
            })                
        },
        filtro(rows, terms){
            if(terms[0] ==='0'){
                const codex = new RegExp(terms, "ig")
                return rows.filter(row =>codex.test(row.CODIGO))
            }else{
                const codex = new RegExp(terms, "ig")
                return rows.filter(row =>codex.test(row.FATOR_DE_RISCO.normalize('NFD').replace(/[\u0300-\u036f]/g, "")))
            }
        },
    },
    watch: {
        agente(){
            this.getRiscos()
        },
        isEsocial(value){
            if(value){
                this.agentes = this.agentesEsocial
            }else{
                this.agentes = [
                    {label:'Fisícos',value:"FISICO"},
                    {label:'Químicos', value:"QUIMICO"},
                    {label:'Biológicos', value:"BIOLOGICO"},
                    {label:'Ergonômicos', value:"ERGONOMICO"},
                    {label:'Outros', value:"OUTROS"},
                    {label:'Acidente/Mecânico', value:"ACIDENTE"}
                ]  
            } 
        }
    },
}
</script>

<style scoped>
    .selected{
        background-color: #39CA80 !important;
        
    }
    #addRisco {
        margin-top: 60px;
       height: 90%;
    }
</style>
