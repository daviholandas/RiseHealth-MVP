<template>
<div>
    <q-table
    :columns="columns"
    :data="dataTable"
    row-key="exames"   
    >    
    <template slot="body" slot-scope="props">
        <q-tr :props="props">
            <q-td key="profissional" :props="props">
            {{ props.row._id.PROFISSIONAL }}
            </q-td>
            <q-td key="exames" :props="props">
            {{ props.row._id.PROCEDIMENTO }}
            </q-td>
            <q-td key="atendidos" :props="props">
              <q-chip small square color="secondary">{{ props.row.Atendidos }}</q-chip>
            </q-td>
            <q-td key="naoAtendidos" :props="props">
                <q-chip small square color="negative">{{ props.row.NotAtendidos }}</q-chip>
             </q-td>
        </q-tr>
      </template>
    </q-table>
</div>   
</template>

<script>

export default {
    props:['date'],
    created() {
        this.getExamesDay(this.date)
    },
    data(){
        return{
            dataTable:[],
            columns:[
                {name:"profissional",label:"Profissional",align:"center"},
                {name:"exames",label:"Exames",align:"center"},
                {name:"atendidos",label:"Atendidos",align:'center'},
                {name:"naoAtendidos",label:"Não Atendidos",align:'center'}
            ],
            componentId:''
        }
    },
    watch: {
        date(val){
            this.getExamesDay(val)
        }
    },
    methods: {
        getExamesDay(date){
            
            this.$axios.get(`/atendimentos/examesDay/${date}`)
                .then(exames => this.dataTable = exames.data) 
           
        }
    },
}
</script>

<style>

</style>
