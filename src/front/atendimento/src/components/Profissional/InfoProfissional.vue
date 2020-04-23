<template>
    <v-card>
        <v-toolbar color="teal ligthen-3" dark>
            <v-toolbar-title>Informações do Profissional</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
            <strong class="px-2 strong">Nome:</strong>{{profissional.nome}}
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text>
            <v-layout row>
                <v-flex>
                    <strong class="px-2 strong">Especialidade:</strong>{{profissional.especialidade}}
                </v-flex>
                <v-flex v-if="profissional.conselhoProfissional">
                    <strong class="px-2 strong">Conselho Profissional:</strong>{{profissional.conselhoProfissional | upperCase}}
                </v-flex>
                <v-flex>
                    <strong class="px-2 strong">CPF:</strong>{{profissional.documentos.cpf | toCPF}}
                </v-flex>
                <v-flex>
                    <strong class="px-2 strong">RG:</strong>{{profissional.documentos.rg }}
                </v-flex>
            </v-layout>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text>
            <v-layout column>
                <v-flex>
                    <h2 class="px-2">Telefones:</h2>
                </v-flex>
                <v-flex pl-3 pt-3 pb-3 v-for="(telefone,index) in profissional.telefones" :key="index">
                    <p> <strong>Telefone {{index + 1}}</strong>- {{telefone.telefone | toPhone}}</p>
                </v-flex>
            </v-layout>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text>
            <v-layout column>
                <v-flex>
                    <h2 class="px-2">Procedimentos:</h2>
                </v-flex>
                <v-flex pl-3 pt-3 pb-3 v-for="(procedimentos,index) in profissional.procedimentos" :key="index">
                    <p>
                    <span class="px-2"> <strong>Procedimento:</strong> </span> {{procedimentos.procedimento}} <span class="px-2"> <strong>Valor:</strong> </span>R$ {{procedimentos.valor | moeda}} 
                    <span class="px-2"><strong>Comissão:</strong></span> <span v-if="procedimentos.comissaoProfissional.tipo === 'porcentagem'">{{procedimentos.comissaoProfissional.valor}}%</span>
                    <span v-else>R$ {{procedimentos.comissaoProfissional.valor | moeda}}</span>
                    </p>
                </v-flex>
            </v-layout>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" flat @click="$emit('dialogChange',dialog = false)">Fechar</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        props: ['profissionalFetched'],
        created() {
            this.profissional = Object.assign(this.profissionalFetched)
        },
        data() {
            return {
                profissional: {},
                dialog:true
            }
        },
    }
</script>

<style scoped>
    .strong{
        font-size: 1.5em;
    }
</style>