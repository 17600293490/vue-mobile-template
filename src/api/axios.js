import axios from 'axios'
import store from '@/store'
// import {
//   Spin,
//   Message
// } from 'iview'
const useErrorCollection = require('@/config')
const addErrorLog = errorInfo => {
  const { statusText, status, request: { responseURL } } = errorInfo
  let info = {
    type: 'ajax',
    code: status,
    mes: statusText,
    url: responseURL
  }
  if (!responseURL.includes('save_error_logger')) store.dispatch('addErrorLog', info)
}

class HttpRequest {
  constructor (baseUrl, token) {
    this.baseUrl = baseUrl // 请求基础url
    this.token = token // 用户token
    this.queue = {} // 临时存储请求url
    this.defaultOptions = {
      isLoading: false, // 是否需要loading
      isToast: true, // 是否需要toast提示
      contentType: 'application/json'
    } // 额外配置，主要市为了灵活性，提供可配置化的
  }
  /**
   * 初始化配置
   */
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        'Authorization': this.token,
        'Content-Type': 'application/json'
      }
    }
    return config
  }
  /**
   * 销毁请求过的url
   * @param {*} url
   */
  destroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      if (this.defaultOptions.isLoading) {
        // Spin.hide()
      }
    }
  }
  /**
   * 拦截请求
   * @param {*} instance
   * @param {*} url
   */
  interceptors (instance, url) {
    instance.interceptors.request.use(config => {
      this.queue[url] = true
      if (Object.keys(this.queue).length) {
        // 添加全局的loading...
        const { isLoading } = this.defaultOptions
        if (isLoading) {
          // Spin.show({
          //   render: (h) => {
          //     return h('div', [
          //       h('Icon', {
          //         'class': 'demo-spin-icon-load',
          //         props: {
          //           type: 'ios-loading',
          //           size: 18
          //         }
          //       }),
          //       h('div', 'Loading')
          //     ])
          //   }
          // })
        }
      }
      return config
    }, error => {
      return Promise.reject(error)
    })
    /**
     * 响应拦截
     */
    instance.interceptors.response.use(res => {
      this.destroy(url)
      const { data, status } = res
      // 各种状态处理...
      // if (data.code) data.code += ''
      // if (data.code && data.code !== '0') {
      //   const code = data.code
      //   if (code === '401' || code === '406' || code === '403') {
      //     store.dispatch('loginTimeout', false)
      //   }
      // }
      return { data, status }
    }, error => {
      this.destroy(url)
      let errorInfo = error.response
      // 需要toast提示
      if (this.defaultOptions.isToast) {
        // Message.error(errorInfo.statusText + errorInfo.status)
      }
      if (errorInfo) {
        // 处理错误...
        switch (errorInfo.status) {
          case 401: {
            store.dispatch('loginTimeout', false)
            break
          }
          case 500: {
            // Message.error('系统出了点问题！')
            break
          }
          default: {
            if (errorInfo.data && errorInfo.data.code + '' !== '0') {
              // Message.error(errorInfo.data.message || '')
            } else {
              // Message.error(error.message || '')
            }
          }
        }
      }
      // 是否开启错误收集
      if (useErrorCollection) { // 如果启用错误收集
        if (!errorInfo) {
          const { request: { statusText, status }, config } = JSON.parse(JSON.stringify(error))
          errorInfo = {
            statusText,
            status,
            request: { responseURL: config.url }
          }
        }
        addErrorLog(errorInfo)
      }
      return Promise.reject(error)
    })
  }
  /**
   * 开始请求
   * @param {*} options 请求配置
   * @param {*} extraOptions 请求额外配置
   */
  request (options, extraOptions) {
    if (extraOptions && extraOptions.contentType) {
      this.defaultOptions.contentType = extraOptions.contentType
    } else {
      this.defaultOptions.contentType = 'application/json'
    }
    if (extraOptions && extraOptions.isLoading) {
      this.defaultOptions.isLoading = extraOptions.isLoading
    } else {
      this.defaultOptions.isLoading = false
    }

    // 创建axios实例
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
