/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 */
export default {
  // dev: {
  //   // localhost:8000/api/** -> https://preview.pro.ant.design/api/**
  //   '/api': {
  //     // 正向代理 要代理的地址
  //     target: 'http://locathost:8888',
  //     // 配置了这个可以从 http 代理到 https
  //     // 依赖 origin 的功能可能需要这个 比如 cookie
  //     changeOrigin: true,
  //   },
  // },
  test: {
    '/api/': {
      target: 'https://proapi.azurewebsites.net',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
