<template>
    <v-card>
        <v-toolbar color="teal ligthen-3" dark>
            <v-toolbar-title>Informações do Paciente</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
            <strong class="px-2 strong">Nome:</strong>{{paciente.nome}}
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text>
            <v-layout>
                <v-flex>
                    <strong class="px-2 strong">Data de Nascimento:</strong>{{paciente.nascimento}}
                </v-flex>
                <v-flex>
                    <strong class="px-2 strong">Idade:</strong>{{paciente.nascimento | idade}}
                </v-flex>
                <v-flex>
                    <strong class="px-2 strong">Sexo:</strong>{{paciente.sexo}}
                </v-flex>
            </v-layout>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text>
            <v-layout>
                <v-flex>
                    <strong class="px-2 strong">Telefone:</strong>{{paciente.telefone |toPhone}}
                </v-flex>
                <v-flex>
                    <strong class="px-2 strong">E-mail:</strong>{{paciente.email}}
                </v-flex>
                <v-flex>
                    <strong class="px-2 strong">Convênio:</strong>{{paciente.convenio.nome}}
                </v-flex>
            </v-layout>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text>
            <v-layout column>
                <v-flex>
                    <h2 class="px-2">Documentos:</h2>
                </v-flex>
                <v-flex pl-3 pt-3 pb-3>
                    <strong class="px-2">CPF:</strong>{{paciente.documentos.cpf | toCPF}}
                </v-flex>
                <v-flex pl-3 pt-3>
                    <strong class="px-2">RG/ORG.EMISSOR:</strong>{{paciente.documentos.rg}}
                </v-flex>
            </v-layout>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text>
            <v-layout column>
                <v-flex>
                    <h2 class="px-2">Endereço:</h2>
                </v-flex>
                <v-flex pl-2 pt-2 pb-2>
                    <strong class="px-2">Rua:</strong>{{paciente.endereco.rua}}
                </v-flex>
                <v-flex pl-2 pt-2 pb-2>
                    <strong class="px-2">Bairro:</strong>{{paciente.endereco.bairro}}
                </v-flex>
                <v-flex pl-2 pt-2 pb-2>
                    <strong class="px-2">Numero:</strong>{{paciente.endereco.numero}}
                </v-flex>
                <v-flex pl-2 pt-2 pb-2>
                    <strong class="px-2">Cidade:</strong>{{paciente.endereco.cidade}}
                </v-flex>
                <v-flex pl-2 pt-2 pb-2>
                    <strong class="px-2">Estado:</strong>{{paciente.endereco.estado}}
                </v-flex>
                <v-flex pl-2 pt-2>
                    <strong class="px-2">Complemento:</strong>{{paciente.endereco.complemento}}
                </v-flex>
            </v-layout>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text>
            <strong class="px-2 strong">Observações:</strong>{{paciente.informacoes}}
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text>
            <strong class="px-2 strong">Atendimentos:</strong>{{atendimentosPaciente}}
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" flat @click="$emit('dialogChange',dialog = false)">Fechar</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        props: ['pacienteFetched'],
        created() {
            this.paciente = Object.assign(this.pacienteFetched)
        },
        data() {
            return {
                paciente: {},
                dialog:true,
            }
        }
    }
</script>

<style scoped>
    .strong{
        font-size: 1.5em;
    }
</style>