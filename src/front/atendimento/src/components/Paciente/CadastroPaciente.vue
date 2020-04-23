<template>
    <v-container grid-list-xl text-xs-center>
        <v-layout row wrap>
            <v-flex xs10 offset-xs1>
                <v-card dark color="teal lighten-3 elevation-20" >
                    <v-card-text>
                        <v-form ref="form" lazy-validation >
                            <v-text-field v-model="paciente.nome" label="Nome" required color="white"
                                 hint="Nome" persistent-hint :rules="[rules.nameRules]"></v-text-field>
                            <v-layout row xs4>
                                <v-flex xm3 xl3>
                                    <v-text-field v-model="paciente.documentos.cpf" label="CPF" required color="white"
                                        xs6 outline mask='###.###.###-##' single-line hint="CPF" persistent-hint></v-text-field>
                                </v-flex>
                                <v-flex xm3 xl3>
                                    <v-text-field  v-model="paciente.documentos.rg" label="RG/ORG.EMISSOR" required color="white"
                                        xs6 outline single-line hint="RG/ORG.EMISSOR" persistent-hint></v-text-field>
                                </v-flex>
                                <v-flex xm3 xl3>
                                    <v-text-field outline slot="activator" v-model.lazy="date" label="Data de nascimento" prepend-icon="event"
                                        single-line hint="Data de nascimento" persistent-hint type="date" @change="alertIdade"></v-text-field>
                                </v-flex>
                                <v-flex xs3 xl3>
                                    <v-select
                                    :items="sexos"
                                    outline
                                    label="Sexo"
                                    v-model="paciente.sexo"
                                    hint="Sexo"
                                    ></v-select>
                                </v-flex>
                            </v-layout>
                            <v-text-field v-model="paciente.endereco.rua" label="Logradouro"  color="white"
                                mask="" hint="Logradouro" persistent-hint></v-text-field>
                            <v-layout row xs4>
                                <v-flex xm3>
                                    <v-text-field v-model="paciente.endereco.bairro" label="Bairro" required color="white" single-line hint="Bairro" persistent-hint></v-text-field>
                                </v-flex>
                                <v-flex xm2>
                                    <v-text-field v-model="paciente.endereco.numero" label="Numero" required color="white" single-line hint="Numero" persistent-hint type="number"></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-text-field v-model="paciente.endereco.complemento" label="Complemento" required color="white"
                                hint="Complemento" persistent-hint></v-text-field>
                            <v-layout>
                                 <v-flex xm3>
                                    <v-text-field v-model="paciente.endereco.cidade" label="Cidade" required color="white" single-line hint="Cidade" persistent-hint></v-text-field>
                                </v-flex>
                                <v-flex xm3>
                                    <v-text-field v-model="paciente.endereco.estado" label="Estado" required color="white" single-line hint="Estado" persistent-hint></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout>
                                 <v-flex xm3>
                                    <v-text-field v-model="paciente.telefone" label="Telefone" required color="white" single-line mask="(##)#####-####" hint="Telefone" persistent-hint type="phone"></v-text-field>
                                </v-flex>
                                <v-flex xm3>
                                    <v-text-field v-model="paciente.email" label="E-mail" required color="white" single-line hint="E-mail" persistent-hint type="email"></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout>
                                <v-textarea
                                box
                                label="Informações:"
                                auto-grow
                                outline
                                background-color="black"
                                v-model="paciente.informacoes"
                                single-line
                                ></v-textarea>
                            </v-layout>
                            <v-layout>
                                <v-checkbox
                                label="Ocupacional"
                                v-model="paciente.__type"
                                value="Colaborador"
                                ></v-checkbox>
                            </v-layout>
                            <v-layout>
                                <v-checkbox
                                label="Convenio"
                                v-model="convenio"
                                ></v-checkbox>
                            </v-layout>
                            <v-layout  v-if="convenio">
                                 <label class="label"><h3>Convenios:</h3></label>
                                <v-flex xs3>
                                    <v-select
                                    :items="convenios"
                                    label="Convenios"
                                    v-model="paciente.convenio"
                                    ></v-select>
                                </v-flex>
                            </v-layout>
                            <v-btn color="info" round @click="enviar" :disabled="mostraBotao"><v-icon medium >save</v-icon> Gravar</v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-snackbar v-model="snackbar" :color="color" :timeout="timeout" top>
                {{ text }}
                <v-btn dark flat @click="snackbar = false">
                   Fechar
                </v-btn>
            </v-snackbar>
        </v-layout>
    </v-container>
</template>

<script>
import PacienteService from '../../services/PacienteService.js'
    export default {
        data() {
            return {
                data:'',
                paciente: {
                    nome: '',
                    nascimento:'',
                    sexo:'',
                    documentos:{
                        rg: '',
                        cpf: ''
                    },
                    endereco:{
                        rua: '',
                        bairro: '',
                        numero: '',
                        cidade: 'Maranguape',
                        estado: 'CE',
                        complemento:''
                    },
                    dataAtendimento:'',
                    telefone: '',
                    email: '',
                    informacoes:'',
                    convenio:{},
                    __type:'Paciente'
                },
                convenio:false,
                convenios: [
                    {text:"Plano Funerario", value:{nome:"Plano Funerario", valor:10}},
                    {text:"Cartão Fidelidade", value:{nome:"Cartão Fidelidade", valor:0.05}}
                ],
                sexos:[
                    {text:"Feminino", value:"Feminino"},
                    {text:"Masculino", value:"Masculino"},
                    {text:"Generico", value:"Generico"}
                    ],
                date:'',
                idade:0,
                menu: false,
                timeout: 6000,
                text: '',
                snackbar: false,
                color:'success',
                mostraBotao:true,
                rules:{
                    nameRules:v=> !!v || 'Nome é obrigatorio!',
                    required:value => !!value || 'Obrigatorio.'
                },
                dialog: false
            }
        },
        watch: {
            'paciente.nome'(){
                this.mostraBotao = false
            },
            'date'(value){
               this.paciente.nascimento = this.formatDate(value)
            }
        },
        methods: {
           enviar() {
                PacienteService.salvar(this.paciente)
                    .then(res =>{
                        this.$swal.fire({
                            text:res.data.message,
                            type: 'success',
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Ok'
                        })
                    })
                    .catch(err=> alert(err)) 
            },
             formatDate (date) {
                const [year, month, day] = date.split('-')
                return `${day}/${month}/${year}`
            },
            alertIdade(idade){
                let ano = this.formatDate(idade).split('/')
                let idadeCalc= new Date().getFullYear() - ano[2]
                if(idadeCalc >= 60){
                   this.text =`Paciente ${this.paciente.nome} é prioridade! Tem ${idadeCalc} anos`
                   this.snackbar = true
                   this.color = 'error' 
                } 
            }
        }
    }
</script>

<style>

</style>
