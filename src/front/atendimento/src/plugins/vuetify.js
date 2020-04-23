import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import '@fortawesome/fontawesome-free/css/all.css'

import pt from 'vuetify/es5/locale/pt'

Vue.use(Vuetify, {
  iconfont: ['md','fa'],
  lang:{
    locales:{pt},
    current:'pt'
  }
})
