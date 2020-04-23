import Vue from 'vue'
import Vuex from 'vuex'

//Modules Stores
import state from './stores/states'
import actions from './stores/actions'
import mutations from './stores/mutations'


Vue.use(Vuex)

export default new Vuex.Store({
state,
mutations,
actions,
})
