import 'babel-polyfill'
import Vue from 'vue'
import './assets/styles/base.css'
import '@/assets/styles/common.less'
import router from './router'
import store from './store'
import api from '@/api'
import config from './config'
import './plugin/vant'

import '@/filters'

import FastClick from 'fastclick'
import App from './App.vue'

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
