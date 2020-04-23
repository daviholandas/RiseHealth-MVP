<template>
    <v-toolbar color="teal lighten-3" >
    <v-toolbar-side-icon class="hidden-sm-and-up"></v-toolbar-side-icon>
    <div class="logo">
    <router-link to="/"><img src="@/assets/img/folder1.jpg" alt=""></router-link>
    </div>
    <v-spacer></v-spacer>
    <div class="hidden-sm-and-down">

    </div>
      <v-btn
        outline
        round
        color="#EDE7F6"
        dark
        class = "exact-active-class"
      >
        <router-link to="/pacientes" class ="link">Paciente</router-link>
      </v-btn>
      <v-btn
        outline
        round
        color="#EDE7F6"
        dark
        class = "exact-active-class"
      >
        <router-link to="/agendamentos" class ="link">Agendamento</router-link>
      </v-btn>

      <v-btn
        outline
        round
        color="#EDE7F6"
        dark
        class = "exact-active-class"
      >
        <router-link to="/atendimentos" class ="link">Atendimento</router-link>
      </v-btn>
      <v-btn
        outline
        round
        color="#EDE7F6"
        dark
        class = "exact-active-class"
      >
        <router-link to="/ocupacional" class ="link">Ocupacional</router-link>
      </v-btn>
  </v-toolbar>
</template>

<script>
export default {

}
</script>

<style scoped>
    img{
        width: 200px;
    }
    .logo{
        margin-top: 5px;
    }
    .link{
      text-decoration: none;
    }
    .link-menu {
      color: black;
    }
</style>
