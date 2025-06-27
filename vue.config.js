const { defineConfig } = require('@vue/cli-service')

const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = defineConfig({
  transpileDependencies: true,

  // GitHub Pages 部署配置
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',

  devServer: {
    port: 7001

  },

  configureWebpack: {
    name: '工具箱',
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    plugins: []
  }
})
