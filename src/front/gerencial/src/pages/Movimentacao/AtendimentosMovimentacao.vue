<template>
    <q-layout>
        <div>
            <q-field icon="date_range" helper="Escolha uma data" class=" q-ma-lg date">
                <q-datetime v-model="date" type="date" align="center" inverted color="secondary" />
            </q-field>
            <div class="row justify-center" >
               <q-card inline  class="q-ma-lg col-lg-12 col-xs-12"   >
                   <div id="exames">
                    <q-card-title>
                        <strong>Painel de Atendimentos</strong>
                    </q-card-title>
                    <q-card-separator />
                    <q-card-main >
                        <table-exames :date="date"/>
                    </q-card-main>
                   </div>
                    <q-card-actions vertical>
                       <q-btn @click="print('exames')" color="primary">Imprimir</q-btn>
                    </q-card-actions>
                </q-card>
               <q-card inline  class="q-ma-lg col-lg-12 col-xs-12" >
                   <div id="comissao">
                    <q-card-title>
                        <strong>Receita Gerada por Profissional</strong>
                    </q-card-title>
                    <q-card-separator />
                    <q-card-main>
                        <table-movimentacao-profissional :date="date"/>
                    </q-card-main>
                   </div>
                    <q-card-actions vertical>
                       <q-btn @click="print('comissao')" color="primary">Imprimir</q-btn>
                    </q-card-actions>
                </q-card>
                <q-card inline  class="q-ma-lg col-lg-12 col-xs-6" id="print">
                    <div id="geral">
                    <q-card-title>
                        <strong>Receita Gerada dos Atendimentos</strong>
                    </q-card-title>
                    <q-card-separator />
                    <q-card-main>
                    <table-exames-fin :date="date" />
                    </q-card-main>
                    </div>
                    <q-card-actions >
                       <q-btn @click="print('geral')" color="primary">Imprimir</q-btn>
                    </q-card-actions>
                </q-card>
            </div>
        </div>
    </q-layout>
</template>

<script>
import { date } from 'quasar'
export default {
   components:{
       TableExames: () => import('../../components/Movimentacao/atendimentos/TableExames.vue'),
       TableExamesFin: ( ) => import('../../components/Movimentacao/atendimentos/TableExameFin.vue'),
       TableMovimentacaoProfissional:() => import('../../components/Movimentacao/atendimentos/TableMovimetacaoProfissional.vue')
   },
   data(){
       return{
           date: date.formatDate(new Date(),"YYYY-MM-DT00:00:00.000"),
       }
   },
   watch: {
       date(val){
           date.formatDate(new Date(val),"YYYY-MM-DT00:00:00.000")

       }
   },
   methods: {
       print(idPrintable){
           this.$htmlToPaper(idPrintable)
       }
   },
}
</script>

<style scoped>
    .date{
        width:200px;
        margin-left: 135px;
    }
    
</style>
