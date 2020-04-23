<template>
    <q-layout>
        <q-card>
            <q-card-title>
                <div class="row">
                    <div>
                        Fechamentos dos Caixas Diarios do Mês 
                    </div>
                        <q-datetime default-view="month" inverted v-model="date" type="date" class="q-ml-lg" />
                </div>
            </q-card-title>
            <q-card-separator />
            <q-card-main>
                <q-table
                :columns="columns"
                :data="fechamentos"
                row-key="date"
                >
                <template slot="top-right" slot-scope="props">
                    <q-chip color="secondary" class="q-mr-md shadow-5">Receita Mensal: {{receitaMensal | moeda}}</q-chip>
                </template>
                <template slot="body" slot-scope="props">
                <q-tr :props="props">
                    <q-td key="date" :props="props">
                    {{ props.row.date | formatDate }}
                    </q-td>
                    <q-td key="receitaLiquida" :props="props">
                    {{ props.row.receitaLiquida | moeda }}
                    </q-td>
                    <q-td key="comissaoPaga" :props="props">
                        {{ props.row.comissaoPaga | moeda }}
                    </q-td>
                </q-tr>
                 </template>
                </q-table>
            </q-card-main>
        </q-card>
    </q-layout>
</template>

<script>
export default {
    created() {
        this.getFechamentos()
    },
    data(){
        return{
            columns:[
                {name:'date', label:'Data', align:'center', style:'font-size:20px; font-weight:700'},
                {name:'receitaLiquida',label:'Valor Liquido', align:'center',style:'font-size:20px; font-weight:700'},
                {name:'comissaoPaga', label:'Comissão Paga', align:'center',style:'font-size:20px; font-weight:700'}
            ],
            fechamentos:[],
            date: new Date().getUTCMonth(),
            receitaMensal:Number,            
        }
    },
    methods: {
        getFechamentos(){
           
            this.$axios.get('/financeiro/fechamentosDiarios')
                .then(fechamentos => this.fechamentos = fechamentos.data)
                .then(()=> this.calcReceitaMensal())
        },
        calcReceitaMensal(){
            this.receitaMensal = this.fechamentos.reduce((sum,{receitaLiquida}) => sum + receitaLiquida,0 )
        }
    },
}
</script>

<style scoped>
    .colunas{
        font-size: 150px;
        font-weight: 100
    }

</style>
