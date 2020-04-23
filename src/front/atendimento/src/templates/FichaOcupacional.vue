<template>
<div id="ficha" v-show="false">
    <v-layout align-center column mt-2 >
        <img :src= 'require("../assets/img/folder1.jpg")' alt="">
        <table border="1" id="ficha" class="v-table dark">
            <thead>
                <th colspan="2"><h1>Ficha de Atendimento</h1></th>
                <td class="pa-2">Data: <span class="pa-2">{{atendimentoComputed.dateRegistered | dataFormated}}</span></td>
                <td class="pa-2">Tipo de exame: <span class="pa-2">{{atendimentoComputed.periodicidade}}</span></td>
            </thead>
            <tbody>
                <tr>
                    <td colspan="3" class="pa-2">Empresa: <span class="pa-2">{{atendimentoComputed.empresa.nome}}</span></td>
                    <td colspan="1" class="pa-2">CNPJ: <span class="pa-2">{{atendimentoComputed.empresa.cnpj}}</span></td>
                </tr>
                <tr>
                    <td colspan="4" class="pa-2">Colaborador: <span class="pa-2">{{atendimentoComputed.colaborador.nome}}</span></td>
                </tr>
                <tr>
                    <td class="pa-2">CPF:<span class="pa-2">{{atendimentoComputed.colaborador.documentos.cpf}}</span> </td>
                    <td class="pa-2">Data de Nascimento: <span class="pa-2">{{atendimentoComputed.colaborador.nascimento}}</span></td>
                    <td class="pa-2">Idade: <span class="pa-2">{{atendimentoComputed.colaborador.nascimento | idade}}</span></td>
                    <td class="pa-2">Sexo: <span class="pa-2">{{atendimentoComputed.colaborador.sexo}}</span></td>
                </tr>
                <tr>
                    <td colspan="2" class="pa-2">Função: <span class="pa-2">{{atendimentoComputed.funcao.funcoes}}</span></td>
                    <td colspan="2"  class="pa-2">Tempo de serviço: <span class="pa-2">{{atendimentoComputed.tempoServico}}</span></td>
                </tr>
                <tr>
                    <td colspan="4" class="pa-2" id="procedimentos"><h3>Exames:</h3>
                        <ul v-for="(procedimento, index) in atendimentoComputed.exames" :key="index" class="exames">
                            <li class="exame">{{procedimento.nome}} | <strong>Ass.:</strong></li>
                        </ul>
                    </td>
                </tr>
            </tbody>
        </table>
        <v-layout align-center justify-center column >
        <v-flex style="margin-top:80px;"><p>Estou ciente que realizei todos os exames citados acima.</p></v-flex>
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
            return this.$store.state.fichaOcupacional
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
    .exame{
        flex: 1;
        font-size: 1rem;
    }
</style>