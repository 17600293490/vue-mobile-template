export default {
  /**
   * @description 当前环境
   */
  currentEnv: '开发环境',
  /**
  * @description api请求基础路径
  */
  baseUrl: '',
  /**
   * @description 是否启用vConsole 手机调试
   */
  useVConsole: false,
  plugin: {
    'error-store': {
      showInHeader: false, // 设为false后不会在顶部显示错误日志徽标
      off: true // 设为true后不会收集错误信息
    },
    vant: {
      off: false // 设为true后不在使用vant
    }
  }
}
