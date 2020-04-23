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
        </v-card-title>
        <v-data-table :headers="headers" :items="atendimentosALL"  class="elevation-1"
            rows-per-page-text="Itens por pagina" :rows-per-page-items="propsTables">

            <template slot="items" slot-scope="props">
                <td class="text-xs-center">
                    <v-btn flat @click="redirectAtendimento(props.item._id.profissional)">{{props.item._id.profissional}}</v-btn>
                </td>
                <td class="text-xs-center attended">{{props.item.ATTENDED}} </td>
                <td class="text-xs-center attend">{{props.item.NOTATTENDED}}</td>
            </template>

        </v-data-table>
    </div>
</template>

<script>
import AtendimentoService from '../../services/AtendimentoService.js'
import moment from 'moment'
    export default {
        data(vm){
            return {
                headers: [
                { text: 'Profissional', value: 'profissional', align:'center' },
                { text: 'Atendidos', value: 'atendidos', align:'center' },
                { text: 'Não atendidos', value: 'naoAtendidos', align:'center' }
                ],
                propsTables:[10,15,20,{ "text": "$vuetify.dataIterator.rowsPerPageAll", "value": -1 },],
                date:new Date().toISOString().substr(0, 10),
                dateFormatted:vm.formatDate(new Date().toISOString().substr(0, 10)),
                menu1:false,
                dateAtendimento:vm.dateSubmit(new Date().toISOString().substr(0, 10)),
                atendimentosALL:[]
            }
        },
        created(){
            this.getAtendimentosAll()
        },
         watch:{
            date(val){
                this.dateAtendimento = this.dateSubmit(val)
                this.dateFormatted = this.formatDate(val)
            },
            dateAtendimento(val){
                this.getAtendimentosAll(val)
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
             async getAtendimentosAll(date=this.dateAtendimento){
                 this.atendimentosALL = await AtendimentoService.getAtendimentosDateALL(date)
            },
            redirectAtendimento(profissional){
                this.$router.push({name:'atendimentoProfissional',params:{name:profissional}})
                /* let route = this.$router.resolve({name:'atendimentoProfissional',params:{name:profissional}})
                window.open(route.href, '_blank') */
            }
        }
    }
</script>

<style>
.attend{
    color: red;
    font-size: 1.5em;
}

.attended{
    color: #4CAF50;
    font-size: 1em;
}

</style>