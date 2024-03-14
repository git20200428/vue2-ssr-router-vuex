import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'

Vue.use(Vuex)

export default function createStore() {
  return new Vuex.Store({
    modules
  })
}