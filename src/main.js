import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import '@/router/permission'
import * as echarts  from 'echarts'


Vue.prototype.$echarts=echarts
// 引入css基础文件
import '@/assets/reset.css'
import i18n from '@/language'

// 加载Vuex中的token ，项目执行就开始执行





Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
