import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import Filtros from 'vue-convenia-util'
import './filters'
import Swal from './plugins/alert'
import Helpers from './helpers/indexHelpers'
import VueDebounce from 'vue-debounce'
import Vuelidate from 'vuelidate'

//Mixins
import './mixins/indexMixins'

import VueHtmlToPaper from 'vue-html-to-paper';


const options = {
  name: '_black',
  specs: [
    'titlebar=yes',
    'scrollbars=yes',
    'menubar = yes',
    'height = 700',
    'width=768'
  ],
  styles: [
    "https://cdn.jsdelivr.net/npm/vuetify@1.x/dist/vuetify.min.css",
    "../src/assets/styles/aso.css",
  ]
}

Vue.use(VueHtmlToPaper, options);

Vue.use(Helpers)
//Plugins
Vue.use(Swal)
Vue.use(VueDebounce,{listenTo:['onkeyup', 'oninput'], defualtTime:'700ms'})
Vue.use(Vuelidate)

Vue.config.productionTip = false


Vue.use(Filtros,{
  formatters: true,
  formatFilters: true
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
