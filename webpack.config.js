/**
 * 不是真实的 webpack 配置，仅为兼容 webstorm 和 intellij idea 代码跳转
 * ref: https://github.com/umijs/umi/issues/1109#issuecomment-423380125
 */
const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@utils': path.resolve(__dirname, 'src/common/utils'),
    },
  },
  proxy: {
    // "/api": {
    //   "target": "http://www.bing.com/",
    //   "changeOrigin": true,
    //   "pathRewrite": { "^/api" : "" }
    // }
  },
  // devServer: {
    // contentBase: path.join(__dirname, 'dist'),
    // compress: true,
    // port: 9000
  // }
};
