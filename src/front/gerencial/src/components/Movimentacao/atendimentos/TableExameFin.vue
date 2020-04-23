<template>
    <q-table
    :columns="columns"
    :data="dataTable"
    row-key="profissional"
    >
    <template slot="top-right" slot-scope="props">
        <div class="titulo">
            <q-chip  class="q-mr-md shadow-5 receita">Caixa Bruto: {{receitaBrutaDay | moeda}}</q-chip>
            <q-chip class="q-ma-md  shadow-5 receita">Comissão: {{receitaComissaoDay | moeda}}</q-chip>
            <q-chip class="q-ma-md shadow-5  receita" >Caixa Liquido: {{receitaLiquidaDay | moeda}}</q-chip>
        </div>
    </template>
    <div slot="bottom" slot-scope="props">
        <div>
            <q-btn @click="fechamentoDiario" color="secondary">Fechar Caixa</q-btn>
        </div>
    </div>
    <template slot="body" slot-scope="props">
        <q-tr :props="props">
            <q-td key="profissional" :props="props">
            {{ props.row._id.Profissional }}
            </q-td>
            <q-td key="procedimento" :props="props">
              {{ props.row._id.Procedimentos }}
            </q-td>
            <q-td key="quantidade" :props="props">
                {{ props.row.Quant }}
             </q-td>
            <q-td key="valorBruto" :props="props">
                <q-chip small square color="primary"> {{ props.row.ValorBruto     | moeda }}</q-chip>
             </q-td>
            <q-td key="desconto" :props="props">
                <q-chip small square color="warning"> {{ props.row.ValorBruto - props.row.ValorLiquido | moeda }}</q-chip>
             </q-td>
            <q-td key="valorLiquido" :props="props">
                <q-chip small square color="secondary"> {{ props.row.ValorLiquido | moeda }}</q-chip>
             </q-td>
            <q-td key="comissao" :props="props">
                <q-chip small square color="negative"> {{ props.row.Comissao == 0 ? 0 :  props.row.Comissao  | moeda }}</q-chip>
             </q-td>
        </q-tr>
      </template>
    </q-table>
</template>

<script>
export default {
    props:['date'],
    created() {
        this.getMovimentacaoDay()
    },
    data(){
        return{
            columns:[
                {name:"profissional",label:"Profissional",align:"center"},
                {name:"procedimento",label:"Procedimento",align:'center'},
                {name:"quantidade",label:"Quantidade",align:'center'},
                {name:"valorBruto",label:"Receita Bruta",align:'center'},
                {name:"desconto",label:"Descontos",align:'center'},
                {name:"valorLiquido",label:"Receita Liquida",align:'center'},
                {name:"comissao",label:"Comissao",align:'center'}
            ],
            dataTable:[],
            receitaLiquidaDay:Number,
            receitaBrutaDay:Number,
            receitaComissaoDay:Number
        }
    },
    watch: {
        date(val){
            this.getMovimentacaoDay(val)
        }
    },
    methods: {
        getMovimentacaoDay(date = this.date){
           this.$axios.get(`atendimentos/movimentacao/${date}`)
            .then(movimentacao => this.dataTable = movimentacao.data.InfoMoney)
            .then(()=> this.calcReceita())
        },
        calcReceita(){ 
            this.receitaBrutaDay = this.dataTable.reduce((sum,{ValorLiquido})=>sum + ValorLiquido,0)
            this.receitaComissaoDay = this.dataTable.reduce((sum,{Comissao})=> sum  + Comissao, 0)
            this.receitaLiquidaDay = this.receitaBrutaDay - this.receitaComissaoDay
        },
        fechamentoDiario(){
            let fechamentoDiario ={
                date: this.date,
                receitaBruta: this.receitaBrutaDay,
                receitaLiquida: this.receitaLiquidaDay,
                comissaoPaga: this.receitaComissaoDay
            }
             this.$swal.fire({
                title: 'Deseja Realizar o Fechamento Diario?',
                text: "Não poderá ter mais movimentações nesse dia!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim'
            })
            .then(result =>{
                if(result.value){
                    this.$axios.post('/financeiro/fecharDia',fechamentoDiario)
                        .then(resp => this.$swal.fire({
                            title:"Caixa Fechado",
                            text:resp.data.message
                    }))
                   
                }
            })
        }
    },
}
</script>

<style>
    .receita{
        font-size: 20px;
    }
    .tituloTable{
        font-size: 25px;
    }
</style>
