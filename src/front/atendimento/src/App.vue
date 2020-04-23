<template>
  <v-app>
    <toolbar/>
    <v-content>
    <v-responsive>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-responsive>
    </v-content>
    <v-footer class="pa-3" fixed>
    <v-spacer></v-spacer>
    <div class="pr-2">Desenvolvido por Davi Holanda</div>
    <div>&copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>

<script>
import toolbar from '@/components/Toolbar'



export default {
  name: 'App',
  components: {
    toolbar
  },
  data () {
    return {
      //
    }
  }
}
</script>
