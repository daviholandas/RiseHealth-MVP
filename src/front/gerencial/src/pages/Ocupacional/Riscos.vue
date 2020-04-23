<template>
    <q-layout>
        <q-page-container>
            <q-page>
                <q-card>
                    <q-card-title>
                        <h3 class="q-ma-none">Cadastro de Riscos</h3>
                    </q-card-title>
                    <q-card-separator /> 
                    <q-card-main>
                        <div class="row gutter-sm q-mt-lg" v-for="(risco, index) in riscos" :key="index">
                            <q-field class="col-sm-5">
                               <q-select :options="agentes" v-model="riscos[index].AGENTE_RISCO" inverted float-label="Agente de risco *"
                                @blur="$v.riscos.$touch"
                                :error="$v.riscos.$error"
                                />
                            </q-field>
                            <div class="self-center q-ml" >
                            <q-btn-group push  >
                                <q-btn push @click="increaseItem(riscos,index)" color="secondary" size="xs">
                                    <q-icon name="add"  />
                                </q-btn>
                                <q-btn push @click="decreaseItem(riscos,index)" :disable="false" color="secondary" size="xs">
                                    <q-icon name="remove" />
                                </q-btn>
                            </q-btn-group>
                            </div>
                            <div class="col-sm-10 col-xs-12">
                                <q-field >
                                    <q-input float-label="Código" inverted color="secondary" v-model="riscos[index].CODIGO" />
                                    <q-input float-label="Fator de Risco *" inverted color="secondary" v-model="riscos[index].FATOR_DE_RISCO" upper-case
                                    @blur="$v.riscos.$touch"
                                    :error="$v.riscos.$error"
                                     />
                                </q-field>
                                <q-field >
                                <q-select :options="isEsocial" v-model="riscos[index].esocial" inverted float-label="E-social?" color="secondary"/>
                                </q-field>
                            </div>
                        </div>
                        <p class="q-pt-lg"><strong>Os campos com (*) são obrigatorios!</strong></p>
                    </q-card-main>
                    <q-card-actions>
                        <q-btn @click="saveRiscos" class="full-width q-pt-xs" color="primary" push  icon="save" label="Salvar"
                         :disable ="$v.$invalid"
                         >
                         <q-tooltip v-if="$v.$invalid">
                        Verifique os campos Obrigatorios!
                        </q-tooltip></q-btn>
                    </q-card-actions>
                </q-card>
            </q-page>
        </q-page-container>
    </q-layout>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { PlanilhaRisco } from '../../interfaces/planilhaRiscos.class.js'
export default {
    data(){
        return{
            riscos:[{
                AGENTE_RISCO:'',
                CODIGO:'',
                FATOR_DE_RISCO:'',
                esocial:false
            }],
            isEsocial: [{label:"Não", value:false},{label:"Sim", value:true}],
            agentes:[
                {label:'Fisíco',value:"FISICO"},
                {label:'Químico', value:"QUIMICO"},
                {label:'Biológico', value:"BIOLOGICO"},
                {label:'Ergonômico', value:"ERGONOMICO"},
                {label:'Acidente/Mecânico', value:"ACIDENTE/MECANICO"},
                {label:'Outros', value:"OUTROS"},
            ]
        }
    },
    methods: {
        increaseItem(array,index){
           if(typeof(array[index]) === 'object'){
              array.push({nome:'',email:'', telefone:['']})
           }else{
              array.push('')
           }
           return index - 1 
          
        },
        decreaseItem(array, index){
            array.pop(index-1)
        },
        saveRiscos(){
            this.$axios.post('common/riscos/add', this.riscos)
                .then(resp =>{
                    this.$swal.fire({
                    type: 'success',
                    title:resp.data.message,
                    showConfirmButton: false,
                    timer: 1500
                    })
                }).then(_ => this.riscos = [{
                AGENTE_RISCO:'',
                CODIGO:'',
                FATOR_DE_RISCO:'',
                esocial:false
            }])
        }
    },
    validations:{
       riscos:{
           $each:{ AGENTE_RISCO:{required},FATOR_DE_RISCO:{required}}
        }
       
    }
}
</script>

<style>

</style>
