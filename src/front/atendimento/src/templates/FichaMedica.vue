<template>
<div id="ficha" v-show="false" >
    <v-layout align-center column mt-2 >
        <img :src= 'require("../assets/img/folder1.jpg")' alt="">
        <table border="1" id="ficha" class="v-table dark">
            <thead>
                <th colspan="3"><h1>Ficha Médica</h1></th>
                <td class="pa-2">Data: <span class="pa-2">{{atendimentoComputed.date | dataFormated}}</span></td>
            </thead>
            <tbody>
                <tr>
                    <td colspan="4" class="pa-2">Nome: <span class="pa-2">{{atendimentoComputed.pacienteID.nome | upperCase}}</span></td>
                </tr>
                <tr>
                    <td class="pa-2">CPF: <span class="pa-2">{{atendimentoComputed.pacienteID.documentos.cpf | toCPF}}</span> </td>
                    <td class="pa-2">Telefone: <span class="pa-2">{{atendimentoComputed.pacienteID.telefone | toPhone}}</span></td>
                    <td class="pa-2">Sexo: <span class="pa-2">{{atendimentoComputed.pacienteID.sexo}}</span></td>
                    <td class="pa-2">Idade: <span class="pa-2">{{atendimentoComputed.pacienteID.nascimento | idade}} anos</span></td>
                    
                </tr>
                <tr>
                    <td class="pa-2">Peso:</td>
                    <td class="pa-2">Altura:</td>
                    <td class="pa-2">P.A: </td>
                    <td class="pa-2">F.C: </td>
                </tr>
                <tr>
                    <td colspan="4" class="pa-2">Observações:<span class="pa-2">{{atendimentoComputed.pacienteID.informacoes | upperCase}}</span></td>
                </tr>
                <tr>
                    <td colspan="4" class="pa-2" style="height: 150px;"><p style="margin-top: -71px;" >Anamnese:</p></td>
                </tr>
                <tr>
                    <td colspan="4" class="pa-2" style="height: 150px;"><p style="margin-top: -71px;" >Evolução Médica:</p></td>
                </tr>
                <tr>
                    <td colspan="4" class="pa-2" style="height: 150px;"><p style="margin-top: -71px;" >Precrição Médica:</p></td>
                </tr>
            </tbody>
        </table>
    </v-layout>
    <v-layout align-center justify-center column >
        <v-flex style="margin-top:70px;">
            <p>_____________________________________________________</p>
        </v-flex>
        <v-flex style="margin-top:0px;">
            <p><span class="pa-2">{{atendimentoComputed.profissional.nome | upperCase}}</span></p>
        </v-flex>
        <v-flex style="margin-top:-18px;">
            <p><span class="pa-2">{{atendimentoComputed.profissional.conselho | upperCase}}</span></p>
        </v-flex>
    </v-layout>
    <v-layout>
        <div class="text-xs-center">
        <p><strong>DECLARO ESTAR CIENTE QUE O RETORNO DESTA CONSULTA É VALIDO POR 30 DIAS.</strong></p>
        <p>_________________________________________________</p>
        <p style="margin-top:-18px;">{{atendimentoComputed.pacienteID.nome}}</p>
        </div>
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

</style>