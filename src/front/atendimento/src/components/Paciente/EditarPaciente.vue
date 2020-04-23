<template>
 <v-container grid-list-xl text-xs-center>
        <v-layout row wrap>
            <v-flex xs10 offset-xs1>
                <v-toolbar dark color="teal lighten-3">
                    <v-btn icon  dark @click="$emit('dialogChange',dialog = false)">
                        <v-icon>close</v-icon>
                    </v-btn>
                    <h2>Editar Paciente</h2>
                </v-toolbar>
                <v-card dark color="teal lighten-2 elevation-20" >
                    <v-card-text>
                        <v-form ref="form" lazy-validation >
                            <v-text-field  v-model="pacienteEdited.nome" label="Nome"  color="white"
                                 hint="Nome" persistent-hint></v-text-field>
                            <v-layout row xs4>
                                <v-flex xm3>
                                    <v-text-field v-model="pacienteEdited.documentos.cpf" label="CPF"  color="white"
                                        xs6 outline mask='###.###.###-##' single-line hint="CPF" persistent-hint></v-text-field>
                                </v-flex>
                                <v-flex xm3>
                                    <v-text-field v-model="pacienteEdited.documentos.rg" label="RG/ORG.EMISSORe"  color="white"
                                        xs6 outline single-line hint="RG/ORG.EMISSOR" persistent-hint></v-text-field>
                                </v-flex>
                                <v-flex xm3>
                                     <v-text-field outline slot="activator" v-model.lazy="date" label="Data de nascimento" prepend-icon="event"
                                        single-line hint="Data de nascimento" persistent-hint type="date" @change="alertIdade"></v-text-field>
                                </v-flex>
                                <v-flex xs3 xl3>
                                    <v-select
                                    :items="sexos"
                                    outline
                                    label="Sexo"
                                    v-model="pacienteEdited.sexo"
                                    hint="Sexo"
                                    ></v-select>
                                </v-flex>
                            </v-layout>
                            <v-text-field v-model="pacienteEdited.endereco.rua" label="Rua"  color="white"
                                mask="" hint="Rua" persistent-hint></v-text-field>
                            <v-layout row xs4>
                                <v-flex xm3>
                                    <v-text-field v-model="pacienteEdited.endereco.bairro" label="Bairro" required color="white" single-line hint="Bairro" persistent-hint></v-text-field>
                                </v-flex>
                                <v-flex xm2>
                                    <v-text-field v-model="pacienteEdited.endereco.numero" label="Numero" required color="white" single-line hint="Numero" persistent-hint type="number"></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-text-field v-model="pacienteEdited.endereco.complemento" label="Complemento" required color="white"
                                hint="Complemento" persistent-hint></v-text-field>
                            <v-layout>
                                 <v-flex xm3>
                                    <v-text-field v-model="pacienteEdited.endereco.cidade" label="Cidade" required color="white" single-line hint="Cidade" persistent-hint></v-text-field>
                                </v-flex>
                                <v-flex xm3>
                                    <v-text-field v-model="pacienteEdited.endereco.estado" label="Estado" required color="white" single-line hint="Estado" persistent-hint></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout>
                                 <v-flex xm3>
                                    <v-text-field v-model="pacienteEdited.telefone" label="Telefone" required color="white" single-line mask="(##)#####-####" hint="Telefone" persistent-hint type="phone"></v-text-field>
                                </v-flex>
                                <v-flex xm3>
                                    <v-text-field v-model="pacienteEdited.email" label="E-mail" required color="white" single-line hint="E-mail" persistent-hint type="email"></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout>
                                <v-textarea
                                box
                                label="Informações:"
                                auto-grow
                                outline
                                background-color="black"
                                v-model="pacienteEdited.informacoes"
                                single-line
                                ></v-textarea>
                            </v-layout>
                            <v-layout>
                                <v-checkbox
                                label="Ocupacional"
                                v-model="pacienteEdited.__type"
                                value="Colaborador"
                                ></v-checkbox>
                            </v-layout>
                            <v-layout >
                                 <label class="label"><h3>Convenios:</h3></label>
                                <v-flex xs3>
                                    <v-select
                                    :items="convenios"
                                    label="Convenios"
                                    v-model="pacienteEdited.convenio"
                                    ></v-select>
                                    </v-flex>
                            </v-layout>
                            <v-btn color="info" round  @click="updatePaciente" ><v-icon medium >save</v-icon> Gravar</v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
import PacienteService from '../../services/PacienteService.js'
export default {
        props:['pacienteFetched'],
        created(){
            this.pacienteEdited = Object.assign(this.pacienteFetched)
        },
        data(vm) {
            return {
                date:'',
                pacienteEdited:{
                    __type:''
                },
                convenios: [
                    {text:"Plano Funerario", value:{nome:"Plano Funerario", valor:10}},
                    {text:"Cartão Fidelidade", value:{nome:"Cartão Fidelidade", valor:0.05}}
                ],
                sexos:[
                    {text:"Feminino", value:"Feminino"},
                    {text:"Masculino", value:"Masculino"},
                    {text:"Generico", value:"Generico"}
                    ],
                dialog: true,
                namePacienteFetch:vm.pacienteFetched.nome
            }
        },
        watch:{
             date(value){
                this.pacienteEdited.nascimento = this.formatDate(value)
            }
        },
        methods:{
            updatePaciente(){
                PacienteService.updatePaciente(this.namePacienteFetch, this.pacienteEdited)
                        .then(res =>{
                            this.$swal.fire({
                                title:res.data.message,
                                showConfirmButton: false,
                                timer:3000,
                                type:'success'
                            })
                        })
                        .then(()=>this.$store.dispatch('getPacientes'))
                        .then(() =>{
                            this.dialog = false
                            this.$emit('dialogChange', this.dialog)
                        })
                        .catch(err=>alert(err))
            },
            formatDate (date) {
                const [year, month, day] = date.split('-')
                return `${day}/${month}/${year}`
            }
        }
}

</script>

<style>

</style>
