<template>
<v-container grid-list-xl text-xs-center>
        <v-layout row wrap>
            <v-flex xs10 offset-xs1>
                <v-card dark color="teal accent-4 elevation-20" >
                    <v-toolbar dark color="teal lighten-2">
                        <v-btn icon  dark @click=" $emit('dialogChange', dialog = false)">
                            <v-icon>close</v-icon>
                        </v-btn>
                        <h2>Editar Profissional</h2>
                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="form" lazy-validation >
                            <v-layout>
                                <v-flex>
                                    <v-text-field label="Nome" v-model="profissionalEdited.nome" ></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row xs4>
                                <v-flex xm3 xl3>
                                    <v-text-field v-model.number="profissionalEdited.documentos.cpf" label="CPF" required color="white"
                                        xs6 outline mask='###.###.###-##' single-line hint="CPF" persistent-hint ></v-text-field>
                                </v-flex>
                                <v-flex xm3 xl3>
                                    <v-text-field  v-model.number="profissionalEdited.documentos.rg" label="RG/ORG.EMISSOR" required color="white"
                                        xs6 outline single-line hint="RG/ORG.EMISSOR" persistent-hint type="number"></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row wrap >
                                <label class="label"><h3>Especialidade:</h3></label>
                                <v-flex xs12 sm2 md3>
                                    <v-text-field v-model="profissionalEdited.especialidade"></v-text-field>
                                </v-flex>
                                <label class="label"><h3>Registro:</h3></label>
                                <v-flex xs12 sm6 md3>
                                    <v-text-field v-model="profissionalEdited.conselhoProfissional"  ></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout>
                                <label  class="label" ><h3>Telefone(s):</h3></label>
                                <v-container row>
                                    <v-layout v-for="(telefone, index) in profissionalEdited.telefones" :key="index">
                                    <v-flex xs3 >
                                        <v-text-field label="Telefone" prepend-icon="local_phone" mask="(##)#####-####"  v-model="profissionalEdited.telefones[index].telefone"></v-text-field>
                                    </v-flex>
                                    <v-btn  icon flat @click="aumentar(profissionalEdited.telefones)" v-if="index <=0"><v-icon>add</v-icon></v-btn>
                                    <div v-show="profissionalEdited.telefones.length > 1 ">
                                    <v-btn icon flat @click="diminuir(index, profissionalEdited.telefones)"  v-if="index <=0"><v-icon>remove</v-icon></v-btn>
                                    </div>
                                    </v-layout>
                                </v-container>
                            </v-layout>
                            <v-layout >
                                </v-layout>
                            <v-layout>
                                <label class="label"><h3>Procedimentos:</h3></label>
                                <v-container row>
                                <v-layout v-for="(procedimentos, index) in profissionalEdited.procedimentos" :key="index">
                                <v-flex xs4 >
                                <v-text-field v-model="profissionalEdited.procedimentos[index].procedimento" label="Procedimento"></v-text-field>
                                </v-flex>
                                <v-flex xs2>
                                <v-text-field prefix="R$" v-model="profissionalEdited.procedimentos[index].valor"  label="Valor" type="number"></v-text-field>    
                                </v-flex>
                                <v-flex xs3>
                                    <v-select
                                    :items="comissao"
                                    label="Comissão"
                                    v-model="profissionalEdited.procedimentos[index].comissaoProfissional.tipo"
                                    ></v-select>
                                </v-flex>
                                <v-flex sm2 md2>
                                    <div v-if="profissionalEdited.procedimentos[index].comissaoProfissional.tipo == 'fixo'">
                                    <v-text-field label="valor" type="number" prefix="R$"  v-model="profissionalEdited.procedimentos[index].comissaoProfissional.valor"></v-text-field>
                                    </div>
                                    <div v-else-if="profissionalEdited.procedimentos[index].comissaoProfissional.tipo == 'porcentagem'">
                                    <v-text-field label="Valor" type="number" suffix="%" v-model="profissionalEdited.procedimentos[index].comissaoProfissional.valor"></v-text-field>
                                    </div>
                                </v-flex>
                                <v-btn  icon flat @click="aumentar(profissionalEdited.procedimentos)" v-if="index <=0"><v-icon>add</v-icon></v-btn>
                                <div v-show="profissionalEdited.procedimentos.length > 1 ">
                                <v-btn icon flat @click="diminuir(index, profissionalEdited.procedimentos)"  v-if="index <=0"><v-icon>remove</v-icon></v-btn>
                                </div>
                                </v-layout>
                                </v-container>
                            </v-layout>
                           <v-btn color="info" round @click="updateProfissional"><v-icon medium >save</v-icon> Gravar</v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import ProfissionalService from '../../services/ProfissionalService.js'
export default {
props:['profissionalFetched'],
  created(){
    this.profissionalEdited = Object.assign(this.profissionalFetched)
  },
  data(vm){
    return{
        profissionalEdited:{},
        comissao:[
            {text:'Procentagem', value:'porcentagem'},
            {text:"Valor fixo", value:'fixo'}
        ],
        dialog:false,
        nameProfissionalFetch:vm.profissionalFetched.nome
    }
  },
  methods:{
    updateProfissional(){
        ProfissionalService.updateProfissional(this.nameProfissionalFetch, this.profissionalEdited)
            .then(res => {
                this.$swal.fire({
                    title: res.data.message,
                    showConfirmButton: false,
                    timer:3000,
                    type:'success'
                })
                .then(()=>{
                    this.dialog = false
                    this.$emit('dialogChange', this.dialog)
                })
            })
            .then(()=>this.$store.dispatch('getProfissionais'))
    },
    aumentar(val){
        if(typeof(val)=='object'){
            val.push({procedimento:'',valor:Number, comissaoProfissional:{}})
        }else{
            val.push(val)
        }
    },
    diminuir(index, val){
        val.pop(index-1)
    }
  }

}
</script>

<style>

</style>
