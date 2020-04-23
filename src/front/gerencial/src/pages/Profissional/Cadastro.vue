<template>
  <q-layout>
    <q-page-container>
      <q-page>
          <div>
            <q-card>
              <q-card-title>
                <h3 class="title">Cadastro de Profissional</h3>
              </q-card-title>
              <q-card-separator />
              <q-card-main>
                <form ref="form">
                <q-field>
                  <q-input float-label="Nome*" v-model="profissional.nome" color="secondary"  
                    @blur="$v.profissional.nome.$touch"
                    :error="$v.profissional.nome.$error"
                  >
                    <q-autocomplete
                    @search="search"
                    @selected="selected"
                    :debounce ="1000"
                    :value-field = "profissionais => `${profissional.nome}`"
                    />
                  </q-input>
                </q-field>
                <div class="row justify-start gutter-sm">
                  <q-field class="col-sm-6">
                    <q-input float-label="Especialidade*" v-model="profissional.especialidade" 
                        color="secondary"
                        upper-case
                        @blur="$v.profissional.especialidade.$touch"
                        :error="$v.profissional.especialidade.$error" 
                    />
                  </q-field>
                  <q-field class="self-end">
                    <q-checkbox v-model="haveConselho" label="Conselho?" color="secondary" />
                  </q-field>
                </div>
                <div class="row justify-start gutter-xs">
                  <q-field class="col-sm-4 col-xs-12">
                    <q-input float-label="CPF" v-model="profissional.documentos.cpf" v-mask="'###.###.###-##'"
                      color="secondary" />
                  </q-field>
                  <q-field class="col-sm-4 col-xs-12" helper="Informe o orgão emissor">
                    <q-input float-label="RG" v-model="profissional.documentos.rg" color="secondary" upper-case />
                  </q-field>
                  <div class="row justify-around gutter-xs col-sm-4" v-if="haveConselho">
                    <q-field class="col-sm-6 col-xs-12">
                      <q-select v-model="conselho.tipo" float-label="Conselhos" :options="conselhos" radio
                        class="self-end" color="secondary" />
                    </q-field>
                    <q-field class="col-sm-6 col-xs-12" helper="Informe o orgão emissor">
                      <q-input float-label="Nº Conselho/Estado" v-model="conselho.numeroConselho" color="secondary"
                        upper-case />
                    </q-field>
                  </div>
                  <div v-if="profissional.conselhoProfissional && !haveConselho">
                    <q-field class="col-sm-6 col-xs-12" helper="Informe o orgão emissor">
                      <q-input float-label="Nº Conselho/Estado" v-model="profissional.conselhoProfissional" color="secondary"
                        upper-case />
                    </q-field>
                  </div>
                </div>
                <div class="row q-pt-lg">
                    <div class="col-sm-3 col-xs-12">
                        <q-field  v-for="(telefone,index) in profissional.telefones" :key="index"   >
                            <q-input float-label="Telefone" 
                                color="secondary" 
                                v-mask="'(##) #####-####'" 
                                v-model="profissional.telefones[index]"
                            />
                        </q-field>
                    </div>
                    <div class="self-start" >
                        <q-btn-group push  >
                            <q-btn push @click="increaseItem(profissional.telefones)" color="secondary" size="xs">
                                <q-icon name="add"  />
                            </q-btn>
                            <q-btn push @click="decreaseItem(profissional.telefones)" :disable="profissional.telefones.length <=1 " color="secondary" size="xs">
                                <q-icon name="remove" />
                            </q-btn>
                        </q-btn-group>
                    </div>
                </div>
                <div class="row  gutter-sm q-pt-xl " v-for="(procedimento,index) in profissional.procedimentos" :key="index + 1 ">
                    <div class="col-sm-3 col-xs-12">
                        <q-field>
                            <q-input float-label="Procedimento*" 
                              type="text" 
                              v-model="profissional.procedimentos[index].procedimento" 
                              @blur="$v.profissional.procedimentos.$touch"
                              :error="$v.profissional.procedimentos.$error"
                              upper-case 
                            />
                        </q-field>
                    </div>
                    <div class="col-sm-2 col-xs-12">
                        <q-field>
                            <q-input float-label="Valor" 
                              prefix="R$" 
                              type="number" 
                              v-model.number="profissional.procedimentos[index].valor" 
                              @blur="$v.profissional.procedimentos.$touch"
                              :error="$v.profissional.procedimentos.$error"
                              :decimals="2"
                            />
                        </q-field>
                    </div>
                    <div class="col-sm-2 col-xs-12">
                        <q-field>
                            <q-select 
                                float-label="Tipo de comissão"
                                :options="comissoaTipo" 
                                v-model="profissional.procedimentos[index].comissaoProfissional.tipo"
                                color="secondary"
                            />
                        </q-field>
                    </div>
                    <div class="col-sm-2 col-xs-12">
                        <q-field>
                            <q-input stack-label="Valor Comissão" 
                                prefix="R$" 
                                type="number" 
                                v-model.lazy="profissional.procedimentos[index].comissaoProfissional.valor"
                                color="secondary" 
                                v-if="profissional.procedimentos[index].comissaoProfissional.tipo == 'fixo'"
                                @input="calcValorComissao(index)"
                            />
                            <q-input stack-label="Valor Comissão" 
                                suffix="%" 
                                type="number" 
                                v-model="profissional.procedimentos[index].comissaoProfissional.valor"
                                color="secondary" 
                                v-if="profissional.procedimentos[index].comissaoProfissional.tipo == 'porcentagem'"
                                @input="calcValorComissao(index)"
                            />
                        </q-field>
                    </div>
                    <div class="col-sm-2 col-xs-12">
                        <q-field>
                            <q-input stack-label="Valor Comissão Calculada" 
                              prefix="R$" 
                              type="number" 
                              v-model="profissional.procedimentos[index].comissaoProfissional.valorComissaoCalc"
                              color="secondary" 
                              readonly
                              :decimals="2"
                            />
                        </q-field>
                    </div>
                    <div class="self-center q-ml" >
                        <q-btn-group push  >
                            <q-btn push @click="increaseItem(profissional.procedimentos,index)" color="secondary" size="xs">
                                <q-icon name="add" />
                            </q-btn>
                            <q-btn push @click="decreaseItem(profissional.procedimentos,index)" :disable="profissional.procedimentos.length <=1 " color="secondary" size="xs">
                                <q-icon name="remove" />
                            </q-btn>
                        </q-btn-group>
                    </div>
                </div>
                <div style="width: 500px; padding-top:30px; max-width: 90vw;">
                  <q-list separator dense>
                      <q-list-header class="row justify-between">
                      <span>Exames Ocupacionias</span> <span class="q-mr-xl q-pr-lg">Valor</span>
                      </q-list-header>
                      <q-item  v-for="(exame, index) in profissional.examesOcupacionais" :key="index">
                          <q-item-main >
                              {{exame.nome}}
                          </q-item-main>
                          <q-item-side >
                              {{exame.valorComissao | moeda}}
                              <q-popup-edit v-model.number="exame.valorComissao">
                                  <q-field >
                                  <q-input v-model.number="exame.valorComissao"  prefix="R$" />
                                  </q-field>
                              </q-popup-edit>
                          </q-item-side>
                          <q-item-side right >
                              <q-btn flat icon="delete" @click="removeExames(index)"/>
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
                </form>
                <p class="q-mt-lg">*Campos obrigatorios</p>
              </q-card-main>
              <q-card-actions>
                  <q-btn :loading="loading" rounded glossy push 
                  icon="save" 
                  color="primary" 
                  @click="save" 
                  class="full-width q-pt-xs"
                  :disable ="$v.$invalid"
                  label="Salvar"
                  >
                    <q-tooltip v-if="$v.$invalid">
                      Verifique os campos Obrigatorios!
                    </q-tooltip>
                  </q-btn>
              </q-card-actions>
            </q-card>
          </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
    import { required } from 'vuelidate/lib/validators'
    import { mask } from 'vue-the-mask'
  export default {
    created() {
      this.$store.dispatch('storeMain/setVisableColumns',['nome', 'categoria', 'valorComissao'])
      this.$root.$on('setedExames',this.setExames)
    },
    components:{
      Exames:() =>(import('../../components/Exames/TableExames.vue'))
    },
    data(vm) {
      return {
        profissional: {
          nome: '',
          documentos: {
            cpf: '',
            rg: ''
          },
          conselhoProfissional: '',
          telefones:[''],
          procedimentos:[{
                procedimento:'',
                valor:Number,
                comissaoProfissional:{
                    tipo:'',
                    valor:Number,
                    valorComissaoCalc:0,
                }
            }],
            examesOcupacionais:[]
        },
        haveConselho: false,
        conselhos: [{
            label: "CRM",
            value: "CRM"
          },
          {
            label: "CREMEC",
            value: "CREMEC"
          },
          {
            label: "CRfa",
            value: "CRfa"
          },
          {
            label: "CRP",
            value: "CRP"
          },
          {
            label: "CRTR",
            value: "CRTR"
          },
          {
            label: "CRN",
            value: "CRN"
          }
        ],
        conselho: {
          tipo: '',
          numeroConselho: ''
        },
        loading: false,
        comissoaTipo:[{label:"Valor Fixo",value:'fixo'},{label:"Porcentagem",value:"porcentagem"}],
        showExames:false,
        profissionais:[]
      }
    },
    watch:{
      'conselho.numeroConselho'(){
        let conselhoTotal = `${this.conselho.tipo}:${this.conselho.numeroConselho}`
        this.profissional.conselhoProfissional = conselhoTotal
      }
    },
    methods: {
        save(){
          this.loading = true
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
                    this.$axios.post('/profissionais/add',this.profissional)
                         .then(resp => this.$swal.fire({
                             title: `${resp.data.message}`,
                             timer:1500,
                             type:'success'
                         }))
                }else{
                    this.$axios.patch(`profissionais/${this.profissional._id}`, this.profissional)
                        .then(resp => this.$swal.fire({
                             title: `${resp.data.message}`,
                             timer:1500,
                             type:'success'
                        }))
                }
            })
            .then(()=>{
              setTimeout(() => {
                this.clearForm()
                this.loading = false
              }, 3000);
            })
            .catch(error => console.log(error))
        },
        increaseItem(array,index){
           if(typeof(array[index]) === 'object'){
              array.push({procedimento:'',valor:Number, comissaoProfissional:{}})
           }else{
              array.push('')
           }
          
        },
        decreaseItem(array, index){
            array.pop(index-1)
        },
        calcValorComissao(index){
         
            switch (this.profissional.procedimentos[index].comissaoProfissional.tipo) {
              case '':
                return this.profissional.procedimentos[index].comissaoProfissional.valorComissaoCalc = 0
              case "fixo":
               return  this.profissional.procedimentos[index].comissaoProfissional.valorComissaoCalc =  
                  this.profissional.procedimentos[index].comissaoProfissional.valor
              case "porcentagem":
               return  this.profissional.procedimentos[index].comissaoProfissional.valorComissaoCalc = 
                this.profissional.procedimentos[index].valor * (this.profissional.procedimentos[index].comissaoProfissional.valor / 100)
            }
        },
        clearForm(){
          let profissional = { nome: '', documentos: {cpf: '', rg: ''},
          conselhoProfissional: '',
          telefones:[''],
          procedimentos:[{
                procedimento:'',
                valor:Number,
                comissaoProfissional:{
                    tipo:'',
                    valor:Number,
                    valorComissionado:0,
                }
          }]
          }
          this.profissional = profissional
          this.showExames = false
          this.examesOcupacionais = new Array;
        },
        async search(terms, done){
          let profissionaisFetched = []
          profissionaisFetched = await this.$axios.get(`profissionais/${terms}`)
          done(this.profissionais = this.createList(profissionaisFetched.data))
        },
        createList(profissionais){
          return profissionais.map(profissioanal =>{
            return {label:profissioanal.nome, value:profissioanal}
          })
        },
        selected(item){
          this.profissional = item.value
        },
        setExames(){
          if(!this.profissional.examesOcupacionais.length){
          this.profissional.examesOcupacionais  = this.$store.state.storeMain.selectedExames
          }else {
            let exam =  this.profissional.examesOcupacionais
            let store = this.$store.state.storeMain.selectedExames
            store.map(exame => {if(!exam.includes(exame)){exam.push(exame)}})
          }
        },
        removeExames(index){
            let exame = this.profissional.examesOcupacionais[index].nome
            this.$q.notify({message:`Exame ${exame} removido com sucesso!`, timeout:3000,type:'warning',color: 'warning',position: 'top'})
            this.profissional.examesOcupacionais.splice(index,1)
        }
    },
    directives: {
      mask
    },
    validations:{
        profissional:{
            nome:{ required },
            especialidade:{ required },
            procedimentos:{ required, $each:{procedimento:{required},valor:{required}} }
        }
    }

  }

</script>

<style scoped>
  .title{
    margin: 0px;
  }
  
</style>
