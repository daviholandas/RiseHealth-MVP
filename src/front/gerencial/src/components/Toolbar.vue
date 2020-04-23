<template>
    <q-toolbar
        color="secondary"
        :glossy="$q.theme === 'mat'"
        :inverted="$q.theme === 'ios'"
      >
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
         Gerencial C.T
        </q-toolbar-title>
        {{this.$date}}

      </q-toolbar>
</template>

<script>
export default {
    computed:{
        leftDrawerOpen:{
            get(){
                return this.$store.state.storeMain.drawerState
            },
            set(val){
                this.$store.commit('storeMain/CHANGE_DRAWER',val)
            }
        }
    }
}
</script>

<style>

</style>
