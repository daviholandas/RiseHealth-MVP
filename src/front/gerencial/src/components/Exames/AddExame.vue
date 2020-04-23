<template>
    <div>
        <q-card>
            <q-card-main>

                <q-field>
                    <q-select :options="categorias" v-model="exame.categoria" color="secondary"/>
                </q-field>
                <q-field  helper="* Codigo para o e-Social" >
                    <div class="row justify-between">
                        <q-input v-model="exame.codigo27" class="col-sm-1 col-xs-2  gutter-xs"  color="secondary" float-label="Codigo"/>
                        <q-input v-model="exame.nome"  color="secondary" float-label="Nome" class="col-sm-11 col-xs-10" upper-case
                        @blur="$v.exame.nome.$touch"
                        :error="$v.exame.nome.$error"
                        />
                    </div>
                </q-field>
                <q-field>
                    <div class="row justify-start">
                    <q-input v-model="exame.valor" prefix="R$" class="col-sm-3" type="number" float-label="Valor"/>
                    <q-select :options="esocial" v-model="exame.esocial" float-label="e-Social" class="q-ml-lg" />
                    </div>
                </q-field>
            </q-card-main>
            <q-card-actions>
                <q-btn class="full-width" rounded push color="secondary" @click="saveExame" v-close-overlay icon="save" label="Salvar" 
                :disable="$v.$invalid"
                />
            </q-card-actions>
        </q-card>
    </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
export default {
    data(){
        return{
            exame:{
                nome:'',
                categoria:'CLINICO',
                codigo27:'',
                esocial:false,
                valor:Number
            },
            categorias:[
                {label:"Clinico", value:"CLINICO"},
                {label:"Laboratorial", value:"LABORATORIAL"},
                {label:"Complementar", value:"COMPLEMENTAR"},
                {label:"Raio-X", value:"RAIO-X"},
                {label:"Outros", value:"OUTROS"},
                {label:"Ultrasson", value:"ULTRASSON"}
            ],
            esocial:[
                {label:'Sim', value:true},
                {label:'Não', value:false}
            ]
        }
    },
    methods: {
        saveExame(){
            this.$axios.post('common/exames/add', this.exame)
                .then(resp => this.$swal.fire({
                    title:resp.data.message
                }))
        }
    },
    validations:{
        exame:{
            nome:{ required }
        }
    }

}
</script>

<style>

</style>
