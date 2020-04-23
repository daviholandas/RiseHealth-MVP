<template>
<div>
    <v-tabs
      v-model="active"
      color="cyan"
      dark
      slider-color="yellow"
    >
      <v-layout justify-space-around>
        <keep-alive>
        <v-tab ripple>
          <router-link to="/pacientes" class="link"><v-icon medium>how_to_reg</v-icon> Pacientes</router-link>
        </v-tab>
        </keep-alive>
        <v-tab ripple>
          <router-link to="/pacientes/addPaciente" class="link"><v-icon medium>person_add</v-icon>  Adicionar</router-link>
        </v-tab>
        <v-tab ripple>
          <router-link to="/pacientes/addColaborador" class="link"><v-icon medium>fas fa-user-tie</v-icon>Colaboradores</router-link>
        </v-tab>
      </v-layout>
    </v-tabs>
  <router-view></router-view>
  </div>
</template>

<script>
export default {

  data(){
    return {
      active:null
    }
  },
  methods:{
    next () {
        const active = parseInt(this.active)
        this.active = (active < 2 ? active + 1 : 0)
    }
  }

}
</script>

<style>
.link{
  text-decoration: none;
  color: aliceblue;
}

</style>
