<template>
    <div>
        <q-list class="q-mt-xl">
            <q-list-header>{{planilha.nomePlanilha}}</q-list-header>
            <q-item-separator />
            <q-item>
                <q-item-main>
                    <q-item-tile><h5 class="q-ma-none">Médico Coordenador</h5></q-item-tile>
                    <q-item-separator />
                    <q-item-tile><strong>{{planilha.medicoCoordenador.nome}} - {{planilha.medicoCoordenador.conselho}}</strong></q-item-tile>
                </q-item-main>
                
            </q-item>
            <q-item-separator />
            <q-item multiline>
                <q-item-main>
                    <q-item-tile>
                        <h5 class="q-ma-none">Setore, Riscos e Funções</h5>
                    </q-item-tile>
                    <q-item-separator />
                    <q-item-tile>
                        <q-tree
                                :nodes="transformePlanilhaToTree(planilha)"
                                node-key="label"
                        />
                    </q-item-tile>
                    </q-item-main>
               
            </q-item>
        </q-list>

    </div>
</template>

<script>
export default {
    props:['planilha'],
    methods: {
        transformePlanilhaToTree(planilha){
            return planilha.setores.map(setor => {
                return{
                    label:setor.nomeSetor,
                    children:[
                        {label:'Funcoes', children:setor.funcoes.map(funcao=>({label:funcao}))},
                        {label:'Riscos', children:setor.riscos.map(risco => ({label:`${risco.codigo} - ${risco.fator} - ${risco.agente}`}))}
                    ]
                }
            })
        }
    },

}
</script>

<style>

</style>
