<template>
    <q-layout>
        <q-card>
            <q-card-title>
                Cadastro de Exames
            </q-card-title>
            <q-card-separator/>
            <q-card-main>
                <q-btn icon="add" color="secondary" push class="float-right" @click="addExame = true">Adicionar Exame</q-btn>
                <q-modal v-model="addExame" :content-css="{width: '80vw'}">
                    <q-modal-layout>
                        <q-toolbar slot="header">
                        <q-toolbar-title>
                            Exames Ocupacionais
                        </q-toolbar-title>
                        <q-btn
                            flat
                            round
                            dense
                            v-close-overlay
                            icon="clear"
                        />
                        </q-toolbar>
                        <add-exame />
                    </q-modal-layout>
                </q-modal>
                 <exames :selection="selection" :hiddeButton="hiddeButton"/>
            </q-card-main>
        </q-card>
    </q-layout>
</template>

<script>
export default {
    components:{
        Exames:() => import('../../components/Exames/TableExames'),
        AddExame:() => import('../../components/Exames/AddExame')
    },
    created() {
        this.$store.dispatch('storeMain/setVisableColumns',['codigo27','nome', 'categoria', 'valorPadrao'])
        this.selection = 'single'
    },
    data(){
        return{
            addExame:false,
            selection:'',
            hiddeButton:false
        }
    }

}
</script>

<style>

</style>
