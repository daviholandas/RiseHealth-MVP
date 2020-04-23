<template>
    <q-layout>
        <q-page-container>
            <q-page>
                <q-card>
                    <q-card-title>
                       <h3 class="q-ma-none">Cadastro de Empresa</h3>
                    </q-card-title>
                    <q-card-separator />
                    <q-card-main>
                        <q-tabs v-model="tabsModel" color="secondary">
                            <q-tab name="xtab-1" icon="info" slot="title" label="Informações" />
                            <q-tab name="xtab-2" icon="add_shopping_cart" slot="title" label="Valores do exames" />
                            <q-tab name="xtab-3" icon="report" slot="title" label="Riscos Ocupacionais" />

                            <q-tab-pane name="xtab-1" keep-alive>
                                    <div class="row justify-start gutter-sm">
                                    <q-field class="col-sm-4 col-xs-9" helper="* Somente Numeros">
                                        <q-input float-label="CNPJ *" color="secondary" v-model="empresa.cnpj"   inverted
                                            @blur="$v.empresa.cnpj.$touch"
                                            :error="$v.empresa.cnpj.$error" 
                                        />
                                    </q-field>
                                        <q-btn flat @click="getInfomacoesEmpresa()" icon="search" size="lg"/>
                                    
                                    </div>
                                    <q-field class="q-mt-lg">
                                        <q-tooltip self="top left" :offset="[30, 30]" max-height="600px">
                                            Pesquise a empresa pelo nome ou CNPJ
                                        </q-tooltip>
                                        <q-input  float-label="Nome Fantasia *" color="secondary" v-model="empresa.fantasia" upper-case  inverted
                                            @blur="$v.empresa.nome.$touch"
                                            :error="$v.empresa.nome.$error" 
                                        >
                                            <q-autocomplete
                                                @search="search"
                                                @selected="selected"
                                                :debounce ="1000"
                                                :value-field = "empresas => `${empresas.fantasia}`"
                                            />
                                        </q-input>
                                        <q-input  float-label="Razão Social" color="secondary" v-model="empresa.nome" upper-case inverted/>
                                    </q-field>
                                    <div class="row justify-start gutter-sm">
                                    <q-field class=" col-sm-2 col-xs-12">
                                        <q-input float-label="Tipo" color="secondary" v-model="empresa.tipo" upper-case  inverted/>
                                    </q-field>
                                    <q-field class="col-sm-4 col-xs-12">
                                        <q-input float-label="Natureza Juridica" color="secondary" v-model="empresa.natureza_juridica" upper-case  inverted />
                                    </q-field>
                                    </div>
                                    <div class="row justify-start gutter-sm" v-for="(atividadePrincipal, index) in empresa.atividade_principal" :key="index">
                                        <q-field class="col-sm-2 col-xs-12">    
                                            <q-input float-label="CNAE" color="secondary" v-model="empresa.atividade_principal[index].code"  inverted />
                                        </q-field>
                                        <q-field class="col-sm-8 col-xs-12">    
                                            <q-input float-label="Descrição da Atividade" color="secondary" v-model="empresa.atividade_principal[index].text" upper-case  inverted />
                                        </q-field>
                                    </div>
                                    
                                    <h5 class="q-mb-none">Endereço:</h5>
                                    <div  class="row justify-start gutter-sm">
                                    <q-field class="col-sm-8  col-xs-12">
                                        <q-input float-label="Logradouro" color="secondary" v-model="empresa.endereco.logradouro" upper-case  inverted/>
                                    </q-field>
                                    <q-field class="col-sm-2 col-xs-7">
                                        <q-input float-label="Numero" color="secondary" v-model="empresa.endereco.numero" upper-case  inverted/>
                                    </q-field> 
                                    <div class="row justify-start gutter-sm">
                                    <q-field class="col-sm-10 col-xs-12">
                                        <q-input float-label="Complemento" color="secondary" v-model="empresa.endereco.complemento" upper-case  inverted/>
                                    </q-field>
                                    <q-field class="col-sm-4 col-xs-7">
                                        <q-input float-label="Bairro" color="secondary" v-model="empresa.endereco.bairro" upper-case  inverted />
                                    </q-field>
                                    <q-field class="col-sm-3 col-xs-7">
                                        <q-input float-label="CEP" color="secondary" v-model="empresa.endereco.cep" upper-case  inverted/>
                                    </q-field>
                                    <q-field class="col-sm-4 col-xs-7">
                                        <q-input float-label="Municipio" color="secondary" v-model="empresa.endereco.municipio" upper-case  inverted />
                                    </q-field>
                                    <q-field class="col-sm-1 col-xs-7">
                                        <q-input float-label="UF" color="secondary" v-model="empresa.endereco.uf" upper-case  inverted/>
                                    </q-field>
                                    </div>
                                    </div>
                                    <h5 class="q-mb-none">Responsaveis:</h5>
                                    <div class="row justify-start gutter-sm" v-for="(responsavel, index) in empresa.responsaveis" :key="index+1">
                                        <div class="col-sm-10 col-xs-10">
                                        <q-field class="col-sm-10 col-xs-12">
                                            <q-input float-label="Nome" color="secondary" inverted v-model="empresa.responsaveis[index].nome" upper-case  />
                                        </q-field>
                                        </div>
                                        <div class="self-center q-ml" >
                                        <q-btn-group push  >
                                            <q-btn push @click="increaseItem(empresa.responsaveis,index)" color="secondary" size="xs">
                                                <q-icon name="add"  />
                                            </q-btn>
                                            <q-btn push @click="decreaseItem(empresa.responsaveis,index)" :disable="empresa.responsaveis.length <=1" color="secondary" size="xs">
                                                <q-icon name="remove" />
                                            </q-btn>
                                        </q-btn-group>
                                        </div>
                                        <div class="col-sm-4 col-xs-10">
                                            <q-field >
                                                <q-input float-label="Cargo" color="secondary" inverted v-model="empresa.responsaveis[index].cargo" upper-case  />
                                            </q-field>
                                        </div>
                                        <div class="col-sm-4 col-xs-10">
                                            <q-field >
                                                <q-input float-label="E-mail" color="secondary" inverted v-model="empresa.responsaveis[index].email" type="email"  />
                                            </q-field>
                                        </div>
                                        <div class="col-sm-4 col-xs-10" >
                                            <q-field >
                                                <q-input float-label="Telefone" color="secondary" inverted v-model="empresa.responsaveis[index].telefone" v-mask="'(##) #####-####'"  />
                                            </q-field>
                                        </div>
                                    </div>
                            </q-tab-pane>
                            <q-tab-pane name="xtab-2" keep-alive >
                                <h5 class="q-mb-none">Valores dos exames:</h5>
                                <div style="width: 700px; padding-top:30px; max-width: 100vw;" class="q-mb-lg">
                                    <q-list separator dense>
                                        <q-list-header class="row justify-between">
                                        <span>Exames Ocupacionias</span> <span class="q-mr-xl q-pr-lg">Valor</span>
                                        </q-list-header>
                                        <q-item  v-for="(exame, index) in empresa.examesOcupacionais" :key="index">
                                            <q-item-main >
                                                {{exame.nome}}
                                            </q-item-main>
                                            <q-item-side >
                                                {{exame.valor | moeda}}
                                                <q-popup-edit v-model.number="exame.valor">
                                                    <q-field >
                                                    <q-input v-model.number="exame.valor"  prefix="R$" />
                                                    </q-field>
                                                </q-popup-edit>
                                            </q-item-side>
                                            <q-item-side right >
                                                <q-btn flat icon="delete" @click="removeExameSelected(index)"/>
                                            </q-item-side>
                                            <q-item-separator />
                                        </q-item>
                                    </q-list>
                                </div>
                                <q-field>
                                <q-btn @click="showExames = true"  color="secondary">Exames Ocupacionais</q-btn>
                                </q-field>
                                <q-modal v-model="showExames" :content-css="{width: '80vw'}">
                                <q-modal-layout>
                                    <q-toolbar slot="header">
                                    <q-toolbar-title>
                                        Exames Ocupacionais
                                    </q-toolbar-title>
                                    <q-btn
                                        flat
                                        round
                                        dense
                                        v-close-overlay
                                        icon="clear"
                                    />
                                    </q-toolbar>
                                </q-modal-layout>
                                    <exames selection="multiple" hiddeButton="false"/>
                                </q-modal>
                            </q-tab-pane>
                            <q-tab-pane name="xtab-3">
                                <q-select :options="planilhas" v-model="selectedPlanilha" inverted color="secondary" float-label="Planilha de Riscos"/>
                                <div v-if="selectedPlanilha">
                                 <planilha :planilha="selectedPlanilha" />
                                </div>
                                <div v-else>
                                    <planilha :planilha="empresa.infoOcupacionais"/>
                                </div>
                            </q-tab-pane>
                        </q-tabs>
                    </q-card-main>
                    <q-card-actions>
                        <strong class="q-my-lg">* Campos Obrigatorios!</strong>
                        <q-btn  rounded glossy push 
                        icon="save" 
                        color="primary" 
                        @click="saveEmpresa" 
                        class="full-width q-pt-xs"
                        label="Salvar"
                        :disable="$v.$invalid"
                        >
                        <q-tooltip v-if="$v.$invalid">
                            Verifique os campos Obrigatorios!
                        </q-tooltip> 
                        </q-btn>
                    </q-card-actions>
                </q-card>
            </q-page>
        </q-page-container>
    </q-layout>
</template>

<script>
import { mask } from 'vue-the-mask'
import { required } from 'vuelidate/lib/validators'
import { Empresa } from '../../interfaces/empresa.class.js'
export default {
    created() {
        this.$root.$on('setedExames', this.setExamesSelected)
        this.$store.dispatch('storeMain/setVisableColumns',['nome', 'categoria', 'valorPadrao'])
        this.getPlanilhasRisco()
    },
    components:{
        Exames: ()=>import('../../components/Exames/TableExames.vue'),
        Planilha:()=> import('../../components/Riscos/ShowPlanilhaRiscos')
    },
    data(vn){
        return{
            empresa:{
                endereco:{
                    logradouro: '',
                    bairro: '',
                    numero: '',
                    cep: '',
                    municipio: '',
                    uf: '',
                    complemento: ''
                },
                atividade_principal:[],
                responsaveis:[{
                    nome:'',
                    cargo:'',
                    email:'',
                    telefone:''
                }],
                examesOcupacionais:[],
                infoOcupacionais:''
            },
            showExames:false,
            empresas:[],
            tabsModel:"xtab-1",
            planilhas:[], 
            selectedPlanilha:null
        }
    },
    watch: {
        selectedPlanilha(value){
            this.empresa.infoOcupacionais = value._id
        }
    },
    methods: {
        getInfomacoesEmpresa(cnpj = this.empresa.cnpj){
           this.$axios.get(`empresas/consulta/${cnpj}`)
            .then(info =>{
                if(info.data.status === 'OK'){
                   this.empresa = Object.assign(new Empresa(info.data))
                }else{
                     this.$q.notify({message:info.data.message, timeout:3000,type:'warning',color: 'warning',position: 'top'})
                }
            })
        },
        increaseItem(array,index){
           if(typeof(array[index]) === 'object'){
              array.push({nome:'',email:'', telefone:['']})
           }else{
              array.push('')
           }
           return index - 1 
          
        },
        decreaseItem(array, index){this.$store.state.storeMain.selectedExames
            array.pop(index-1)
        },
        setExamesSelected(){
            if(!this.empresa.examesOcupacionais.length){
                this.empresa.examesOcupacionais  = this.$store.state.storeMain.selectedExames
            }else {
                let exam =  this.empresa.examesOcupacionais
                let store = this.$store.state.storeMain.selectedExames 
                store.map(exame => {if(!exam.includes(exame)){exam.push(exame)}})
            }
            console.log(this.empresa.examesOcupacionais.length)
        },
        removeExameSelected(index){
            let exame = this.empresa.examesOcupacionais[index].nome
            this.$q.notify({message:`Exame ${exame} removido com sucesso!`, timeout:3000,type:'warning',color: 'warning',position: 'top'})
            this.empresa.examesOcupacionais.splice(index,1)
        },
        saveEmpresa(){
            this.$swal.fire({
                title: 'O que deseja fazer?',
                type: 'question',
                showCancelButton: true,
                showCloseButton: true,
                cancelButtonText:'Editar',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Adicionar',
            }).then(result=>{
                if(result.value){
                    this.$axios.post('empresas/add', this.empresa)
                         .then(resp => this.$swal.fire({
                             title: `${resp.data.message}`,
                             timer:1500,
                             type:'success'
                         }))
                }else{
                    this.$axios.put(`empresas/${this.empresa._id}`, this.empresa)
                        .then(resp => this.$swal.fire({
                             title: `${resp.data.message}`,
                             timer:1500,
                             type:'success'
                        }))
                }
            })
        },
         async search(terms, done){
            let empresasFetched = []
            empresasFetched =  await this.$axios.get(`empresas/nomeFantasia/${terms}`)
            done(this.empresas = this.createList( empresasFetched.data))
            
           
        },
        selected(item){
           this.empresa = item.value
        },
        createList(empresas){
            return empresas.map(empresa=>{
                return {
                    label:empresa.nome,
                    value:empresa
                    }
            } )
        },
        async getPlanilhasRisco(){
            let planilhas = await this.$axios.get('/common/planilhariscos')
            planilhas.data.map(planilha => {
              this.planilhas.push({label:planilha.nomePlanilha, value:planilha})
            })
        }
    },
    directives:{
        mask
    },
    validations:{
        empresa:{
            nome:{ required },
            cnpj:{ required }
        }
    }

}
</script>

<style>
    
</style>
