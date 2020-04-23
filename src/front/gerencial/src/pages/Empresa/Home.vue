<template>
    <q-layout>
        <q-card>
            <q-card-title>
                Empresas
            </q-card-title>
            <q-card-separator/>
            <q-card-main>
                <q-table
                    :columns="columns"
                    :data="empresas"
                    separator="cell"
                    
                    row-key="nome"
                >
                <template slot="body" slot-scope="props">
                    <q-tr :props="props"  :class="props.row.activated ? '':'bg-negative'" >
                        <q-tooltip v-if="!props.row.activated">
                                {{props.row.motivoDesativated}}
                        </q-tooltip>
                        <q-td key="cnpj" :props="props">{{props.row.cnpj}}</q-td>
                        <q-td key="nome" :props="props">{{ props.row.nome }}</q-td>
                        <q-td key="fantasia" :props="props">{{ props.row.fantasia }}</q-td>
                        <q-td key="status" :props="props"  >
                            {{props.row.activated ? 'Ativada': 'Bloqueada'}}
                            <q-toggle v-model="props.row.activated"  @input="bloquerEmpresa(props.row)" class="q-ml-xs" />
                            <q-icon name="info" size="20px"  @click.native="showEmpresa(props.row)" class="q-mx-sm" />
                        </q-td>
                    </q-tr>
                </template>
                </q-table>
            </q-card-main>
        </q-card>
        <q-modal v-model="infoEmpresa" :content-css="{width: '90vw'}">
            <q-modal-layout>
                <q-toolbar>
                    <q-toolbar-title>
                        {{empresa.fantasia}}
                    </q-toolbar-title>
                    <q-btn
                        flat
                        round
                        dense
                        v-close-overlay
                        icon="clear"
                    />
                </q-toolbar>
                <div class="layout-padding">
                    <info-empresa :empresa="empresa"/>
                </div>
            </q-modal-layout>
        </q-modal>
    </q-layout>
</template>

<script>
export default {
    components:{
        InfoEmpresa: () => import('../../components/Empresa/InfoEmpresa')
    },
    data(){
        return{
            columns:[
                {name:"cnpj", label:'CNPJ', field:"cnpj", align:'center'},
                {name:"nome", label:'Razão Social', field:"nome", align:'center'},
                {name:"fantasia", label:'Nome Fantasia', field:"fantasia", align:'center'},
                {name:"status", label:'Status', field:"status", align:'center'}
            ],
            empresas:[],
            blocking:false,
            infoEmpresa:false,
            empresa:{}
        }
    },
    methods: {
        getEmpresas(){
            this.$axios.get('/empresas')
                .then(empresas => this.empresas = empresas.data)

        },
        showEmpresa(empresa){
            this.infoEmpresa = true
            this.empresa = empresa
        },
        async deleteEmpresa(id){
            try {
                await this.$axios.delete(`/empresas/${id}`)
                this.getEmpresas()
            }
            catch(err) {
                console.log(err)
            }   
        },
        bloquerEmpresa(empresa){
            if(!empresa.activated){
                this.$q.dialog({
                    title:"Motivo do bloqueio:",
                    color:'warning',
                    ok:true,
                    prompt:{
                        model:'',
                        type:'text'
                    }
                }).then(data => this.$axios.put(`empresas/${empresa._id}`, {activated:false, motivoDesativated:data})
                    .then( _ => this.$q.notify({message:`Empresa bloqueada!`, timeout:3000,type:'warning',color: 'warning',position: 'top'}))
                )
            }else{
                this.$axios.put(`empresas/${empresa._id}`, {activated:true, motivoDesativated:""})
                    .then(_ => this.$q.notify({message:`Empresa desbloqueada!`, timeout:3000,type:'positive',color: 'positive',position: 'top'}))
            }
            
        }
    },
    created() {
        this.getEmpresas()
    },

}
</script>

<style>

</style>
