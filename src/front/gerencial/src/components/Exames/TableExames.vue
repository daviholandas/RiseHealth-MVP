<template>
    <div>
        <q-card>
            <q-card-main>
                <div class="q-my-lg">
                    <q-select :options="categorias" v-model="categoria" float-label="Categoria de Exames" />
                </div>
                <q-table
                :columns="columns"
                :data="exames"
                row-key="nome"
                :selection="selection"
                :selected.sync="selected"
                :filter="terms"
                :filter-method="filtro"
                :visible-columns ="visableColumns"
                >
                    <template slot="top-selection" slot-scope="props">
                        <q-btn color="negative" flat label="Delete" class="q-mr-sm" @click="deleteExamesSelected"  v-show="!hiddeButton" />
                    </template>
                    <template slot="top-right" slot-scope="props">
                        <q-search hide-underline v-model="terms" />
                    </template>
                    <template slot="body" slot-scope="props" >
                        <q-tr :props="props" >
                        <q-td auto-width key="check">
                            <q-checkbox color="primary" v-model="props.selected"  />
                        </q-td>   
                        <q-td key="codigo27" :props="props">{{props.row.codigo27 == null || '' ? (props.row.__index + 1) : props.row.codigo27 }}</q-td>
                        <q-td key="nome" :props="props">{{props.row.nome}}</q-td>
                        <q-td key="categoria" :props="props">{{ props.row.categoria }}</q-td>
                        <q-td key="valorPadrao" :props="props">
                             {{ props.row.valor | moeda }}
                                <q-popup-edit v-model.number="props.row.valor" v-show="!hiddeButton">
                                    <q-field >
                                    <q-input v-model="props.row.valor" @keydown.enter="updateValor(props.row._id, props.row.valor)" prefix="R$" type="number"/>
                                    </q-field>
                                </q-popup-edit>
                        </q-td>
                        <q-td key="valorComissao" :props="props">
                             {{ props.row.valorComissao | moeda }}
                                <q-popup-edit v-model.number="props.row.valorComissao">
                                    <q-field >
                                    <q-input v-model="props.row.valorComissao" prefix="R$" type="number"/>
                                    </q-field>
                                </q-popup-edit>
                        </q-td>
                        </q-tr>
                    </template>
                </q-table>
            </q-card-main>
            <q-card-actions>
                <q-btn class="full-width" rounded push color="secondary" v-show="hiddeButton" @click="setExamesSelected" v-close-overlay>Selecionar Exames</q-btn>
            </q-card-actions>
        </q-card>
    </div>
</template>

<script>
import { http } from '../../plugins/axios'
export default {
    created() {
      this.getExames()  
    },
    props:['selection', 'hiddeButton'],
    data(){
        return{
            columns:[
                {name:'codigo27',label:'Código',align:'center'},
                {name:'nome',label:'Nome',align:'center'},
                {name:'categoria',label:'Categoria',align:'center'},
                {name:'valorPadrao',label:'Valor Padrão',align:'center'},
                {name:'valorComissao',label:'Valor Comissão',align:'center'}
            ],
            categorias:[
                {label:"Todos", value:"TODOS"},
                {label:"Clinico", value:"CLINICO"},
                {label:"Laboratorial", value:"LABORATORIAL"},
                {label:"Complementar", value:"COMPLEMENTAR"},
                {label:"Raio-X", value:"RAIO-X"},
                {label:"Outros", value:"OUTROS"},
                {label:"Ultrasson", value:"ULTRASSON"}
            ],
            categoria:'',
            exames:[],
            selected:[],
            terms:'',
            visableColumns: this.$store.state.storeMain.visableColumns
            
        }
    },
    watch: {
        categoria(value){
            this.getExames(value)
        },
        selected(value){
            this.modifyExamesSelected(value)
        }
    },
    methods: {
        getExames(categoria){
            if(categoria == 'TODOS' || !categoria){
                this.$axios.get('/common/exames')
                    .then(exames => this.exames = exames.data)
            }
            else{
                this.$axios.get(`/common/exames/${categoria}`)
                    .then(exames => this.exames = exames.data)
            }
        },  
        modifyExamesSelected(exames){
            exames.map(exame =>{ 
                Object.assign(exame, {exameID:exame._id})
            })
        },
        setExamesSelected(){
            if(!this.selected.length){
                this.$swal.fire({title:"Selecione pelo menos um exame!", type:'warning'})
            }else{
                this.$swal.fire({title:"Exames selecionados com sucesso!"})
                this.$store.dispatch('storeMain/setExamesSelected',this.selected)
                this.selected = []
                this.$root.$emit('setedExames');
            }
        },
        filtro(rows, terms){
            const codex = new RegExp(terms, "ig")
            return rows.filter(row =>codex.test(row.nome.normalize('NFD').replace(/[\u0300-\u036f]/g, "")))
        },
        updateValor(id,valorPuted){
            let valor = {valor:valorPuted}
           this.$axios.put(`common/exames/changeValor/${id}`,valor)
            .then(res => this.$q.notify({message:`O valor do exame ${res.data.nome} alterado com sucesso! `, timeout:3000,type:'positive',color: 'positive',position: 'top'}))

        }
    },
}
</script>

<style scoped>
    .selected{
        background-color: #39CA80 !important;
    }

</style>
