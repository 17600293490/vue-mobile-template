import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import config from './config'
import installPlugin from '@/plugin'
import filters from '@/filters'

import './assets/styles/base.css'
import '@/assets/styles/common.less'

import FastClick from 'fastclick'

FastClick.attach(document.body)
// 解决ios点击input 需要多次的问题
FastClick.prototype.focus = function (targetElement) {
  targetElement.focus()
}

if (config.useVConsole) {
  const VConsole = require('vconsole')
  window.vConsole = new VConsole()
}

/**
 * @description 注入全局过滤器
 */
Object.keys(filters).forEach(item => {
  Vue.filter(item, filters[item])
})

/**
 * @description 注册admin内置插件
 */
installPlugin(Vue)

/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
