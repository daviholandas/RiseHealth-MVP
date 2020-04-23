<template>
   <v-container grid-list-xl text-xs-center>
        <v-layout row wrap>
            <v-flex xs10 offset-xs1>
                <v-card dark color="teal accent-4 elevation-20" >
                    <v-card-text>
                        <v-form ref="form" lazy-validation >
                            <v-layout>
                                <v-flex>
                                    <v-text-field label="Nome" v-model="profissional.nome" ></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row xs4>
                                <v-flex xm3 xl3>
                                    <v-text-field v-model.number="profissional.documentos.cpf" label="CPF" required color="white"
                                        xs6 outline mask='###.###.###-##' single-line hint="CPF" persistent-hint ></v-text-field>
                                </v-flex>
                                <v-flex xm3 xl3>
                                    <v-text-field  v-model.number="profissional.documentos.rg" label="RG/ORG.EMISSOR" required color="white"
                                        xs6 outline single-line hint="RG/ORG.EMISSOR" persistent-hint type="number"></v-text-field>
                                </v-flex>
                                <label class="label"><h3>Especialidade:</h3></label>
                                <v-flex xs12 sm2 md3>
                                    <v-text-field v-model="profissional.especialidade"></v-text-field>
                                </v-flex>
                                
                                <v-flex>
                                    <v-checkbox label="Conselho?" v-model="mostraConselho"></v-checkbox>
                                </v-flex>
                            </v-layout>
                            <v-layout v-if="mostraConselho">
                                <label class="label"><h3>Registro:</h3></label>
                                <v-flex xs2>
                                    <v-select
                                    :items="conselhos"
                                    label="Conselho"
                                    v-model="conselho.tipo"
                                    ></v-select>
                                    </v-flex>
                                    <v-flex xs12 sm6 md3>
                                        <v-text-field v-model="conselho.registro"  ></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout>
                                <label  class="label" ><h3>Telefone(s):</h3></label>
                                <v-container row>
                                    <v-layout v-for="(telefone, index) in profissional.telefones" :key="index">
                                    <v-flex xs3 >
                                        <v-text-field label="Telefone" prepend-icon="local_phone" mask="(##)#####-####"  v-model.number="profissional.telefones[index].telefone"></v-text-field>
                                    </v-flex>
                                    <v-btn  icon flat @click="aumentar(profissional.telefones)" v-if="index <=0"><v-icon>add</v-icon></v-btn>
                                    <div v-show="profissional.telefones.length > 1 ">
                                    <v-btn icon flat @click="diminuir(index, profissional.telefones)"  v-if="index <=0"><v-icon>remove</v-icon></v-btn>
                                    </div>
                                    </v-layout>
                                </v-container>
                            </v-layout>
                            <v-layout>
                                <label class="label"><h3>Procedimentos:</h3></label>
                                <v-container row>
                                <v-layout v-for="(procedimentos, index) in profissional.procedimentos" :key="index">
                                <v-flex xs4 >
                                <v-text-field v-model="profissional.procedimentos[index].procedimento" label="Procedimento"></v-text-field>
                                </v-flex>
                                <v-flex xs2>
                                <v-text-field prefix="R$" v-model="profissional.procedimentos[index].valor"  label="Valor" type="number"></v-text-field>    
                                </v-flex>
                                <v-flex xs3>
                                    <v-select
                                    :items="comissao"
                                    label="Comissão"
                                    v-model.number="profissional.procedimentos[index].comissaoProfissional.tipo"
                                    ></v-select>
                                </v-flex>
                                <v-flex sm2 md2>
                                    <div v-if="profissional.procedimentos[index].comissaoProfissional.tipo == 'fixo'">
                                    <v-text-field label="valor" type="number" prefix="R$"  v-model.number="profissional.procedimentos[index].comissaoProfissional.valor"></v-text-field>
                                    </div>
                                    <div v-else-if="profissional.procedimentos[index].comissaoProfissional.tipo == 'porcentagem'">
                                    <v-text-field label="Valor" type="number" suffix="%" v-model.number="profissional.procedimentos[index].comissaoProfissional.valor"></v-text-field>
                                    </div>
                                </v-flex>
                                <v-btn  icon flat @click="aumentar(profissional.procedimentos)" v-if="index <=0"><v-icon>add</v-icon></v-btn>
                                <div v-show="profissional.procedimentos.length > 1 ">
                                <v-btn icon flat @click="diminuir(index, profissional.procedimentos)"  v-if="index <=0"><v-icon>remove</v-icon></v-btn>
                                </div>
                                </v-layout>
                                </v-container>
                            </v-layout>
                            <v-layout>
                                
                            </v-layout>
                            <v-btn color="info" round @click="enviar" :disabled="mostrarBotao"><v-icon medium >save</v-icon> Gravar</v-btn>
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
    data(){
        return{
            profissional:{
                nome:"",
                documentos:{
                    cpf:Number,
                    rg:Number
                },
                especialidade:"",
                conselhoProfissional:" ",
                procedimentos:[{
                    procedimento:'',
                    valor:Number,
                    comissaoProfissional:{
                    tipo:'',
                    valor:Number
                    }
                }],
                telefones:[{
                    telefone:""
                }]
                
            },
            conselhos:["CRM", "CREMEC", "CRFa", "CRP","CRTR","CRN"],
            conselho:{
                tipo:" ",
                registro:" "
            },
            mostraConselho:false,
            mostrarBotao: true,
            comissao:[
                {text:'Procentagem', value:'porcentagem'},
                {text:"Valor fixo", value:'fixo'}
            ]
        }
    },
    methods:{
        enviar(){
            this.profissional.conselhoProfissional = `${this.conselho.tipo}: ${this.conselho.registro}`
            ProfissionalService.salvar(this.profissional).then(resp =>{
                this.$swal.fire({
                    title: resp.data.message,
                    showConfirmButton: false,
                    timer:3000,
                    type:'success'
                })
            })
            .then(()=>{
                setTimeout(()=>{
                this.$refs.form.reset()
                },700)
            })
            .catch((err)=>{
                this.$swal.fire({
                    title: `Algo deu errado tente de novo! ${err}`,
                    showConfirmButton: true,
                    type:'error'
                })
            })
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
    },
    watch:{
        'profissional.nome'(){
            this.mostrarBotao = false
        },
        'conselho.tipo'(){
            if(this.conselho.tipo=='CRM' || this.conselho.tipo== 'CREMEC'){
                let nomes = this.profissional.nome.split(' ')
                if(nomes[0] ==='Dr.') return ' '
                
                this.profissional.nome = "Dr."+ " " + this.profissional.nome
            }
        }
    }
}
</script>

<style>
    .label{
        margin-top: 32px;
        margin-left: 11px;
        padding: 0px;
    }
    .botao_add{
        margin-right: 0px;
    }
    .comissao{
        display: block;
    }
</style>
