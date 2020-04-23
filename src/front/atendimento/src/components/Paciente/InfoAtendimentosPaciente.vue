<template>
    <v-card>
        <v-toolbar>
            <h2>Informações dos Atendimentos</h2>
        </v-toolbar>
        <v-card-text>
            <h3>{{atendimentosPaciente}}</h3>
        </v-card-text>
    </v-card>
</template>

<script>
import AtendimentoService from '../../services/AtendimentoService.js'
export default {
    props:['pacienteFetched'],
    data(){
        return{
            atendimentosPaciente:[],
            dialog:true
        }
    },
    created() {
        AtendimentoService.getAtendimentosPaciente(this.pacienteFetched)
            .then(atendimentos => this.atendimentosPaciente = atendimentos.data)
    },

}
</script>

<style>

</style>
