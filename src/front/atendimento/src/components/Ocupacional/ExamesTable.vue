<template>
    <v-container>
        <v-card width="700">
        <v-layout>
            <v-flex xs12 sm12  >
                <v-tabs
                v-model="active"
                color="cyan"
                dark
                centered
                >
                    <v-tab v-for="(categoria, index) in categorias" :key="index" ripple @click="fetchExames(categoria.value)" >
                        {{categoria.text}}
                    </v-tab>
                    <v-tab-item >
                        <v-text-field
                            v-model="search"
                            append-icon="search"
                            label=" Buscar Exame"
                            single-line
                            hide-details
                            class="mb-3"
                        ></v-text-field>        
                        <v-data-table
                        :headers="headers"
                        :items="exames"
                        hide-headers
                        item-key="nome"
                        class="elevation-1"
                        :search="search"
                        >
                        <template v-slot:items="props">
                        <tr>
                            <td class="text-xs-center">
                                <v-btn @click="selectingExames(props)" flat>{{ props.item.nome }}</v-btn>
                            </td>
                        </tr>
                        </template>
                        </v-data-table>
                    </v-tab-item>
                </v-tabs>
            </v-flex>
        </v-layout>
        </v-card>
    </v-container>
</template>

<script>
import ExamesService from '../../services/ExamesService';
import {EventBus} from '@/event-bus.js'
export default {
    created(){
        this.fetchExames("CLINICO")
    },
    data(){
        return{
            selected:[],
            exames:[],
            categorias:[
                {text:"Clinico", value:"CLINICO"},
                {text:"Laboratorial", value:"LABORATORIAL"},
                {text:"Complementar", value:"COMPLEMENTAR"},
                {text:"Raio-X", value:"RAIO-X"},
                {text:"Outros", value:"OUTROS"},
                {text:"Ultrasson", value:"ULTRASSON"}
            ],
            headers:[
               {text:"",value:"nome", align:"center"} 
            ],
            active:null,
            search:'',
            examesSelected:[]
        }
    },
    watch:{
        selected(newValue, old){
            this.defineExamesSelected(newValue, old)
        }
    },
    methods:{
        fetchExames(value){
            ExamesService.getCategoryExames(value).then(exames => this.exames = exames.data)
        },
        selectingExames(value){
            this.examesSelected.push(value.item)
            EventBus.$emit('selectedExames', this.examesSelected)
          
        },
        defineExamesSelected(newValue, old){
            let diferenca = newValue.filter(exame => !old.includes(exame))
            this.examesSelected = old.concat(diferenca)
            EventBus.$emit('selectedExames', this.examesSelected)
        }
    }

}
</script>

<style>
    #exames{
        display: flex;
    }

</style>
