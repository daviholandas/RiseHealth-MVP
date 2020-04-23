<template>
      <div class="editProfissional">
        <q-card>
          <q-card-main>
            <form ref="form">
            <q-field>
              <q-input float-label="Nome*" v-model="profissionalEdit.nome" color="secondary"  
                @blur="$v.profissionalEdit.nome.$touch"
                :error="$v.profissionalEdit.nome.$error"
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
                <q-input float-label="Especialidade*" v-model="profissionalEdit.especialidade" 
                    color="secondary"
                    upper-case
                    @blur="$v.profissionalEdit.especialidade.$touch"
                    :error="$v.profissionalEdit.especialidade.$error" 
                />
              </q-field>
            </div>
            <div class="row justify-start gutter-xs">
              <q-field class="col-sm-4 col-xs-12">
                <q-input float-label="CPF" v-model="profissionalEdit.documentos.cpf" v-mask="'###.###.###-##'"
                  color="secondary" />
              </q-field>
              <q-field class="col-sm-4 col-xs-12" helper="Informe o orgão emissor">
                <q-input float-label="RG" v-model="profissionalEdit.documentos.rg" color="secondary" upper-case />
              </q-field>
              <div class="row justify-around gutter-xs col-sm-4" >
                <q-field class="col-sm-6 col-xs-12" helper="Informe o orgão emissor">
                  <q-input float-label="Conselho Profissional" v-model="profissionalEdit.conselhoProfissional" color="secondary"
                    upper-case />
                </q-field>
              </div>
            </div>
            <div class="row q-pt-lg">
                <div class="col-sm-3 col-xs-12">
                    <q-field  v-for="(telefone,index) in profissionalEdit.telefones" :key="index"   >
                        <q-input float-label="Telefone" 
                            color="secondary" 
                            v-mask="'(##) #####-####'" 
                            v-model="profissionalEdit.telefones[index]"
                        />
                    </q-field>
                </div>
                <div class="self-start" >
                    <q-btn-group push  >
                        <q-btn push @click="increaseItem(profissionalEdit.telefones)" color="secondary" size="xs">
                            <q-icon name="add"  />
                        </q-btn>
                        <q-btn push @click="decreaseItem(profissionalEdit.telefones)" :disable="profissionalEdit.telefones.length <=1 " color="secondary" size="xs">
                            <q-icon name="remove" />
                        </q-btn>
                    </q-btn-group>
                </div>
            </div>
            <div class="row  gutter-sm q-pt-xl " v-for="(procedimento,index) in profissionalEdit.procedimentos" :key="index + 1 ">
                <div class="col-sm-3 col-xs-12">
                    <q-field>
                        <q-input float-label="Procedimento*" 
                          type="text" 
                          v-model="profissionalEdit.procedimentos[index].procedimento" 
                          @blur="$v.profissionalEdit.procedimentos.$touch"
                          :error="$v.profissionalEdit.procedimentos.$error"
                          upper-case 
                        />
                    </q-field>
                </div>
                <div class="col-sm-2 col-xs-12">
                    <q-field>
                        <q-input float-label="Valor" 
                          prefix="R$" 
                          type="number" 
                          v-model.number="profissionalEdit.procedimentos[index].valor" 
                          @blur="$v.profissionalEdit.procedimentos.$touch"
                          :error="$v.profissionalEdit.procedimentos.$error"
                          :decimals="2"
                        />
                    </q-field>
                </div>
                <div class="col-sm-2 col-xs-12">
                    <q-field>
                        <q-select 
                            float-label="Tipo de comissão"
                            :options="comissoaTipo" 
                            v-model="profissionalEdit.procedimentos[index].comissaoProfissional.tipo"
                            color="secondary"
                        />
                    </q-field>
                </div>
                <div class="col-sm-2 col-xs-12">
                    <q-field>
                        <q-input stack-label="Valor Comissão" 
                            prefix="R$" 
                            type="number" 
                            v-model.lazy="profissionalEdit.procedimentos[index].comissaoProfissional.valor"
                            color="secondary" 
                            v-if="profissionalEdit.procedimentos[index].comissaoProfissional.tipo == 'fixo'"
                            @input="calcValorComissao(index)"
                        />
                        <q-input stack-label="Valor Comissão" 
                            suffix="%" 
                            type="number" 
                            v-model="profissionalEdit.procedimentos[index].comissaoProfissional.valor"
                            color="secondary" 
                            v-if="profissionalEdit.procedimentos[index].comissaoProfissional.tipo == 'porcentagem'"
                            @input="calcValorComissao(index)"
                        />
                    </q-field>
                </div>
                <div class="col-sm-2 col-xs-12">
                    <q-field>
                        <q-input stack-label="Valor Comissão Calculada" 
                          prefix="R$" 
                          type="number" 
                          v-model="profissionalEdit.procedimentos[index].comissaoProfissional.valorComissaoCalc"
                          color="secondary" 
                          readonly
                          :decimals="2"
                        />
                    </q-field>
                </div>
                <div class="self-center q-ml" >
                    <q-btn-group push  >
                        <q-btn push @click="increaseItem(profissionalEdit.procedimentos,index)" color="secondary" size="xs">
                            <q-icon name="add" />
                        </q-btn>
                        <q-btn push @click="decreaseItem(profissionalEdit.procedimentos,index)" :disable="profissionalEdit.procedimentos.length <=1 " color="secondary" size="xs">
                            <q-icon name="remove" />
                        </q-btn>
                    </q-btn-group>
                </div>
            </div>
             <div style="width: 500px; padding-top:30px; max-width: 90vw;">
                  <q-list separator dense >
                      <q-list-header class="row justify-between">
                       <span>Exames Ocupacionias</span> <span>Comissão</span>
                      </q-list-header>
                      <q-item  v-for="(exame, index) in profissionalEdit.examesOcupacionais" :key="index">
                          <q-item-main>
                              {{exame.exameID.nome}}
                          </q-item-main>
                          <q-item-side right >
                           R$ {{exame.valorComissao}}
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
                  <exames/>
              </q-modal>
            <p class="q-mt-lg">*Campos obrigatorios</p>
            </form>
          </q-card-main>
          <q-card-actions>
              <q-btn :loading="loading" rounded glossy push 
              icon="save" 
              color="primary" 
              @click="updateProfissional" 
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
</template>

<script>
    import { required } from 'vuelidate/lib/validators'
    import { mask } from 'vue-the-mask'
  export default {
    components:{
      Exames: () => import('../../components/Exames/ExamesShow.vue') 
    },
    created() {
      this.profissionalEdit = Object.assign(this.profissional)
    },
    props:['profissional'],
    data(vm) {
      return {
        profissionalEdit: {
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
        profissionais:[],
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
        showExames:false
      }
    },
    watch:{
      'conselho.numeroConselho'(){
        let conselhoTotal = `${this.conselho.tipo}:${this.conselho.numeroConselho}`
        this.profissionalEdit.conselhoProfissional = conselhoTotal
      },
      showExames(value){
        if(!value){
          this.profissional.examesOcupacionais = this.createExamesSelected(this.$store.state.storeMain.selectedExames)
        }
      }
    },
    methods: {
        updateProfissional(){
         this.loading = true
          this.$axios.patch(`profissionais/${this.profissionalEdit.nome}`,this.profissionalEdit)
            .then(resp =>{
              this.$swal.fire({
                type: 'success',
                title:resp.data.message,
                showConfirmButton: false,
                timer: 1500
              })
            })
            .then(()=>{
              setTimeout(() => {
                this.loading = false
                this.edit = false
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
         
            switch (this.profissionalEdit.procedimentos[index].comissaoProfissional.tipo) {
              case '':
                return this.profissionalEdit.procedimentos[index].comissaoProfissional.valorComissaoCalc = 0
              case "fixo":
               return  this.profissionalEdit.procedimentos[index].comissaoProfissional.valorComissaoCalc =  
                 this.profissionalEdit.procedimentos[index].comissaoProfissional.valor
              case "porcentagem":
               return  this.profissionalEdit.procedimentos[index].comissaoProfissional.valorComissaoCalc = 
                this.profissionalEdit.procedimentos[index].valor * (this.profissionalEdit.procedimentos[index].comissaoProfissional.valor / 100)
            }
        },
        createExamesSelected(exames){
          let examesSelected = []
          exames.map(exame => examesSelected.push({exameID: exame._id, valor: exame.valor}))
          return examesSelected
        },
        async search(terms, done){
          let profissionaisFetched = []
          profissionaisFetched = await this.$axios.get(`profissionais/${terms}`)
          done(this.profissionais =  this.createList(profissionaisFetched))
        },
        createList(profissionais){
          profissionais.map(profissional =>{
            return {
              label: profissional.nome,
              value: profissional
            }
          })
        },
        selected(item){
          this.profissional = item.value
        }
    },
    directives: {
      mask
    },
    validations:{
        profissionalEdit:{
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

  .editProfissional{
    touch-action: nome;
  }
</style>
