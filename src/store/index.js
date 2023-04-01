import Vue from 'vue'
import Vuex from 'vuex'
import userModule from './module/userModule'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    // 模块注册
    userModule
  }
})
