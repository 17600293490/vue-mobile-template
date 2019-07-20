const path = require('path')
function resolve (dir) {
  return path.join(__dirname, './', dir)
}
module.exports = {
  publicPath: process.env.NODE_ENV === 'development' ? '/' : './',
  outputDir: process.env.VUE_APP_TYPE === 'testing' ? 'testing' : 'dist',
  productionSourceMap: false,
  configureWebpack: (config) => {
    Object.assign({}, config, {
      resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
          '@': resolve('src')
        }
      }
    })
  },
  devServer: {
    proxy: {
      '/': {
        target: 'http://www.guangyan.com/', // 设置你调用的接口域名和端口号
        changeOrigin: true, // 跨域
        secure: true, // 如果是https接口，需要配置这个参数
        pathRewrite: {
          '^/': '/' // 这里理解成用‘/api'代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://10.1.5.11:8080/xxx/duty?time=2017-07-07 14:57:22'，直接写‘/api/xxx/duty?time=2017-07-07 14:57:22'即可
        }
      }
    }
  }
}
