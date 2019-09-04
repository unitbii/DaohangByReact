// 运行时配置文件，可以在这里扩展运行时的能力，比如修改路由、修改 render 方法等
const isDev = process.env.NODE_ENV === 'development'

// ref: https://umijs.org/config/
export default {
  // base: '/', // 部署到非根目录时需要配置
  // publicPath: '/', // 指向静态资源文件所在的路径(这是在生产环境配置cdn时用的)
  treeShaking: true,
  context: { // 配置全局 context
    publicPath: '/' // 有可能给这些文件配cdn
  },
  plugins: [ // 插件列表
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: { webpackChunkName: true },
      title: 'umi-myapp',
      dll: true,
      locale: {
        enable: true,
        default: 'en-US',
      },
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /common\//,
          /components\//,
        ],
      },
    }],
  ],
}
