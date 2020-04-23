<template>
  <div id="q-app">
    <q-layout view="lHh Lpr lFf">
      <q-layout-header>
        <toolbar/>
      </q-layout-header>
      <drawer/>
      <q-page-container id="paginas">
        <router-view />
      </q-page-container>
      <q-layout-footer>
        <q-toolbar color="secondary">
          <q-toolbar-title />
          <div class="justify-end">
            Desenvolvido por Davi Holanda &copy; {{ new Date().getFullYear() }}
          </div>
        </q-toolbar>
      </q-layout-footer>
    </q-layout>
  </div>
</template>

<script>
export default {
  name: 'App',
  components:{
    Toolbar: () => import('./components/Toolbar.vue'),
    Drawer: () => import('./components/Drawer.vue')
  }
}
</script>

<style>
  #paginas{
    margin-top: -50px;
  }
</style>
