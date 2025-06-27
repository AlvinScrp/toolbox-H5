const { defineConfig } = require('@vue/cli-service')

const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = defineConfig({
  transpileDependencies: true,

  // GitHub Pages 部署配置
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',

  // 禁用所有代码检查
  lintOnSave: false,

  devServer: {
    port: 7001,
    client: {
      // 禁用开发服务器的错误覆盖层
      overlay: false
    }
  },

  configureWebpack: {
    name: '工具箱',
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    plugins: []
  },

  // 禁用热更新时的代码检查
  chainWebpack: config => {
    // 移除默认的代码检查插件
    config.module.rules.delete('eslint');

    // 配置 vue-loader，禁用模板检查
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => ({
        ...options,
        compilerOptions: {
          preserveWhitespace: false,
          whitespace: 'condense'
        }
      }))
  }
})
