<template>
  <div>
    <div >
      <v-data-table :headers="headers" :items="agendamentos" class="elevation-1" no-data-text="Não tem agendamentos marcados!" :rows-per-page-items="paginas">
        <template slot="items" slot-scope="props">
          <td class="text-xs-center">{{ props.item.pacienteID.nome }}</td>
          <td class="text-xs-center">{{ props.item.pacienteID.nascimento | idade }} anos</td>
          <td class="text-xs-center">{{props.item.pacienteID.telefone | toPhone}}</td>
          <td class="text-xs-center">
            <div v-for="procedimento in props.item.consulta" :key='procedimento.procedimento' class="listProcedimentos ml-2 pt-3">
              <p>{{procedimento.procedimento}}</p>
            </div>
          </td>
          <td class="text-xs-center"> R$ {{ props.item.valorConsulta | moeda }}</td>
          <template v-if="props.item.confirmed">
            <td class="text-xs-center success" >
              <v-layout row >
                <v-flex ma-0 pt-1 >
                  <v-btn small round color='error' @click="dismakeAtendimento(props.item._id, props.index)">
                    Desmarcar
                  </v-btn>
                </v-flex>
                <v-flex pl-3>
                        <v-menu offset-y>
                          <template v-slot:activator="{ on }">
                            <v-btn flat icon v-on="on">
                            <v-icon medium >
                              print
                            </v-icon>
                            </v-btn>
                          </template>
                          <v-list>
                            <v-list-tile @click="printFicha(props.item._id,'ficha',templateFichaAte)">
                            <strong>Ficha de Atendimento</strong> 
                            </v-list-tile>
                            <v-list-tile @click="printFicha(props.item._id,'ficha', templateFichaMe)">
                            <strong>Ficha Médica</strong> 
                            </v-list-tile>
                          </v-list>
                        </v-menu>
                </v-flex>
              </v-layout>
            </td>
          </template>
          <template v-else>
            <v-layout row>
              <v-flex  pl-4 pt-1 px-0 >
                <v-btn small round color="warning" @click="makeAtendimento(props.item,props.index)">Confirmar</v-btn>
              </v-flex>
              <v-flex px-0>
                <v-btn flat icon medium @click="deleteAgendamento(props)">
                  <v-icon>
                    delete
                  </v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </template>
        </template>
        </v-data-table>
        <div v-if="fichaDialog">
          <component :is="componenteGlobal" :loadingDialog="loadingDialog"/>
        </div>  
    </div>
  </div>
</template>

<script>
const FichaMedica = () => import('../../templates/FichaMedica.vue');
const FichaAtendimento = () => import('../../templates/FichaAtendimento.vue');
  import AgendaService from '../../services/AgendaService.js'
  export default {
    props: ['agenda'],
    data: () => ({
      dialog: false,
      agendamentos: [],
      paginas:[-1],
      headers: [{
          text: 'Paciente',
          value: 'paciente',
          align: 'middle'
        },
        {
          text: 'Idade',
          value: 'idade',
          align: 'middle'
        },
        {
          text: 'Telefone',
          value: 'telefone',
          align: 'middle'
        },
        {
          text: 'Procedimentos',
          value: 'procedimentos',
          align: 'middle'
        },
        {
          text: 'Valor',
          value: 'valor',
          align: 'middle'
        },
        {
          text: 'Status',
          value: 'status',
          align: 'middle',
          width: 50
        },
      ],
      confirmed: true,
      loadingDialog:false,
      templateFichaAte: FichaAtendimento,
      templateFichaMe:FichaMedica
    }),
    watch: {
      dialog(val) {
        val || this.close()
      }
    },
    created() {
      this.getAgenda()
    },
    methods: {
      getAgenda(){
        AgendaService.GetAgenda(this.agenda.profissional.nome, this.agenda.date)
          .then(agendamentos => this.agendamentos = agendamentos.data)
        
      },
      async makeAtendimento(agendamento, index) {
        let atendimento = Object.assign(agendamento)
        await this.$agendamentoHelper.makeAtendimento(agendamento, atendimento)
        this.agendamentos[index].confirmed = true 
      },

      async dismakeAtendimento(agendamentoID, index) {
        this.agendamentos[index].confirmed = false
      },

     async deleteAgendamento(agendamento) {
        await this.$agendamentoHelper.deleteAgendamento(agendamento)
        this.agendamentos.splice(agendamento.index, 1)
      },

      printFicha(agendaID, printableID="ficha",template){
       this.$print(agendaID, printableID,template)
      }
    }
  }
</script>

<style>
  .listProcedimentos {
    display: inline-flex;
  }

  .buttonConfirmed {
    font-size: 0.75em;
  }
  .botoes{
    display: inline;
  }
</style>