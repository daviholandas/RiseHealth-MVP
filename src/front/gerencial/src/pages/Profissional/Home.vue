<template>
    <q-page>
        <q-card>
            <q-card-title>
               <h2 class="titulo">Lista de Profissionais</h2>
            </q-card-title>
            <q-card-separator />
            <q-card-main>
            <q-table
                :data="tableData"
                :columns="colunas"
                :filter="filter"
                :visible-columns="visibleColumns"
                :separator="separator"
                row-key="nome"
                color="secondary"
                selection="single"
                :selected.sync="selected"
            >
            <template slot="top-selection" slot-scope="props">
                <q-btn color="negative" flat label="Delete" class="q-mr-sm" @click="deleteProfissional" icon="delete" />
            </template>
            <template slot="top-right" slot-scope="props">
                <dir class="q-pr-sm"> <q-btn label="Novo" push rounded icon="add" color="primary" to="/profissionais/add"/></dir>
                <q-table-columns
                label="Colunas"
                color="secondary"
                class="q-mr-sm"
                v-model="visibleColumns"
                :columns="colunas"
                />
                <q-select
                color="secondary"
                v-model="separator"
                :options="[
                    { label: 'Horizontal', value: 'horizontal' },
                    { label: 'Vertical', value: 'vertical' },
                    { label: 'Celulas', value: 'cell' },
                    { label: 'None', value: 'none' }
                ]"
                hide-underline
                />
                <q-btn
                flat round dense
                :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
                @click="props.toggleFullscreen"
                />
                
            </template>
            <template slot="body" slot-scope="props">
            <q-tr :props="props">
            <q-td auto-width key="check">
                <q-checkbox color="primary" v-model="props.selected" />
            </q-td>   
            <q-td key="nome" :props="props">{{props.row.nome}}</q-td>
            <q-td key="especialidade" :props="props">{{ props.row.especialidade }}</q-td>
            <q-td key="conselho" :props="props">{{ props.row.conselhoProfissional }}</q-td>
            <q-td key="procedimentos" :props="props">
                <q-checkbox color="primary" v-model="props.expand" checked-icon="remove" unchecked-icon="add" class="q-mr-md" />
                Procedimentos
            </q-td>
            <q-td key="telefones" :props="props">
                <div v-for="(telefone,index) in props.row.telefones" :key="index" class="row inline gutter-xs">
                    <div class="col-xs-3">
                    <p >{{index + 1}}  - {{telefone}} |</p>
                    </div>
                </div>
            </q-td>
            </q-tr>
            <q-tr v-show="props.expand" :props="props">
                <q-td colspan="100%">
                    <div v-for="(procedimento,index) in props.row.procedimentos" :key="index">
                        <p>{{procedimento.procedimento}}  - {{procedimento.valor | moeda}}</p>
                    </div>
                </q-td>
            </q-tr>
            </template>
            </q-table>
            </q-card-main>
        </q-card>
    </q-page>
    </template>

<script>
export default {
    created(){
        this.getProfissionais()
    },
    data(){
        return {
            colunas:[
                {name:'nome',label:'Nome',align:'left'},
                {name:'especialidade',label:'Especialidade',align:'left'},
                {name:'conselho',label:'Conselho',align:'left'},
                {name:'procedimentos',label:'Procedimentos',align:'left'},
                {name:'telefones',label:'Telefone',align:'left'},
                {name:'documentos',label:'Documentos',align:'left'}
            ],
            tableData:[],
            visibleColumns:['nome','especialidade', 'conselho', 'procedimentos'],
            filter:'',
            separator:'cell',
            selected:[]
        }
    },
    methods:{
        async getProfissionais(){
            this.tableData = await this.$axios.get('profissionais').then(profissionais => profissionais.data)
        },
        deleteProfissional(){
            this.$swal.fire({
                title: 'Deseja deletar?',
                text: this.selected[0].nome,
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim',
                cancelButtonText: 'Não'
            }).then(result =>{
                if(result.value){
                    this.$axios.delete(`profissionais/delete/${this.selected[0]._id}`)
                        .then(resp=>this.$swal.fire({
                            title: resp.data.message,
                            type: 'success',
                            confirmButtonColor: '#3085d6'
                        }))
                    this.tableData.splice(this.selected[0].__index,1)
                }
            })
        }
    }
}
</script>

<style>
    .titulo{
        margin: 0px;
    }
</style>
