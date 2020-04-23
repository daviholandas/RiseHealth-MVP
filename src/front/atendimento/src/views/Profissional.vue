<template>
<div>
    <v-tabs
      v-model="active"
      color="cyan"
      dark
      slider-color="yellow"
    >
      <v-layout justify-space-around>
        <v-tab ripple>
          <router-link to="/profissionais" class="link"><v-icon medium>how_to_reg</v-icon> Profissionais</router-link>
        </v-tab>
        <v-tab ripple>
          <router-link to="/profissionais/addProfissional" class="link"><v-icon medium>person_add</v-icon>  Adicionar</router-link>
        </v-tab>
      </v-layout>
    </v-tabs>
    <v-container>
      <router-view></router-view>
    </v-container>
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