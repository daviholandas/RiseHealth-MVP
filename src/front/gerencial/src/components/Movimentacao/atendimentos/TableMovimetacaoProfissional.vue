<template>
<div>
    <q-table
    :columns="columns"
    :data="dataTable"
    row-key="_id"
    selection="single"
    :selected.sync="selected"
    >
    <template slot="top-selection" slot-scope="props">
        <q-btn flat color="primary" @click="printRecibo">Imprimir Recibo</q-btn>
    </template>
    <template slot="body" slot-scope="props">
        <q-tr :props="props">
            <q-td auto-width key="check">
                <q-checkbox color="primary" v-model="props.selected" />
            </q-td>
            <q-td key="profissional" :props="props">
            {{ props.row._id }}
            </q-td>
            <q-td key="receita" :props="props">
                <q-chip small square color="secondary"> {{ props.row.Receita | moeda }}</q-chip>
            </q-td>
            <q-td key="comissao" :props="props">
                <q-chip small square color="negative"> {{ props.row.Comissao | moeda }}</q-chip>
            </q-td>
        </q-tr>
      </template>
    </q-table>
    <div v-if="selected.length > 0">
    <component :is="componentId" :profissional="selected[0]" :date ="date"></component>
    </div>
</div>
</template>

<script>
const Recibo = () => import('../../../templates/ReciboProfissional.vue')
export default {
    props:['date'],
    created() {
        this.getMovimentacaoProfissional()
    },
    data(){
        return{
            columns:[
                {name:"profissional",label:"Profissional",align:"center"},
                {name:"receita",label:"Receita",align:'center'},
                {name:"comissao",label:"Comissao",align:'center'}
            ],
            dataTable:[],
            selected:[],
            profissionalSelected:{},
            componentId:Recibo
        }
    },
    watch: {
        date(val){
            this.getMovimentacaoProfissional(val)
        }
    },
    methods: {
        getMovimentacaoProfissional(date = this.date){
           this.$axios.get(`atendimentos/movimentacao/${date}`)
            .then(movimentacao => this.dataTable = movimentacao.data.InfoPorProfissional)
        },
        printRecibo(){
           this.$htmlToPaper('printRecibo')
        }
    },
}
</script>

<style>

</style>