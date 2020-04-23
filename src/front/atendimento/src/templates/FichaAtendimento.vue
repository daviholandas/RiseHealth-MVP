<template>
<div id="ficha" v-show="false">
    <v-layout align-center column mt-2 >
        <img :src= 'require("../assets/img/folder1.jpg")' alt="">
        <table border="1" id="ficha" class="v-table dark">
            <thead>
                <th colspan="3"><h1>Ficha de Atendimento</h1></th>
                <td class="pa-2">Data: <span class="pa-2"></span>{{atendimentoComputed.date | dataFormated}}</td>
            </thead>
            <tbody>
                <tr>
                    <td colspan="4" class="pa-2">Nome: <span class="pa-2"></span>{{atendimentoComputed.pacienteID.nome}}</td>
                </tr>
                <tr>
                    <td colspan="2" class="pa-2">CPF:v<span class="pa-2">{{atendimentoComputed.pacienteID.documentos.cpf | toCPF}}</span> </td>
                    <td class="pa-2">Telefone: <span class="pa-2"> {{atendimentoComputed.pacienteID.telefone | toPhone}}</span> </td>
                    <td class="pa-2">Sexo: <span class="pa-2">{{atendimentoComputed.pacienteID.sexo}}</span></td>
                </tr>
                <tr>
                    <td colspan="4" class="pa-2">Observações: <span class="pa-2">{{atendimentoComputed.pacienteID.informacoes}}</span></td>
                </tr>
                <tr>
                    <td colspan="3" class="pa-2">Atendimento: <span  class="pa-2">{{atendimentoComputed.profissional.nome}}</span></td>
                    <td class="pa-2" >Convenio:<span class="pa-2">{{atendimentoComputed.pacienteID.convenio.nome}}</span></td>
                </tr>
                <tr>
                    <td colspan="4" class="pa-2" id="procedimentos"><h3>Procedimentos:</h3>
                        <ul v-for="procedimento in atendimentoComputed.consulta" :key="procedimento.procedimento">
                            <li>{{procedimento.procedimento}} | <strong>Ass.:</strong></li>
                        </ul>
                    </td>
                </tr>
            </tbody>
        </table>
        <v-layout align-center justify-center column >
        <v-flex style="margin-top:100px;">
            <p>_____________________________________________________</p>
        </v-flex>
        <v-flex style="margin-top:0px;">
            <p>Assinatura do Paciente</p>
        </v-flex>
       
    </v-layout>
    </v-layout>
</div>
</template>
<script>
export default {
computed:{
    atendimentoComputed(){
        return this.$store.state.atendimento
    }
}
}
</script>

<style scoped>
    .v-table thead {
        font-size: 1.5rem;
    }
    .v-table tbody tr td {
        font-size: 1.5rem;
    }

    #procedimentos{
        height: 200px;
    }

    #procedimentos h3 {
       margin-top: -92px;
    }
</style>