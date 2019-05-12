import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from '@/api'
import config from './config'
import './plugin/vux'
import '@/libs/filter'
import '@/assets/styles/common.less'
import FastClick from 'fastclick'
FastClick.attach(document.body)

if (config.useVConsole) {
  const VConsole = require('vconsole')
  window.vConsole = new VConsole()
}
console.log('test')
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    api.init(this)
  }
}).$mount('#app')
