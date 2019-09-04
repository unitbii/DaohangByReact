// 运行时配置文件，可以在这里扩展运行时的能力，比如修改路由、修改 render 方法等。

export const dva = {
  config: {
    onError(err) {
      err.preventDefault();
      console.error(err.message);
    },
  },
};

export const patchRoutes = routes => {
  // console.log(routes);
  // 可以对全部的路由进行操作
  // let route = routes[0].routes
  // for (let i = 0; i < route.length; i++) {
  //   route[i].path = '/main' + route[i].path
  // }
  // 在约定路由的基础上，追加新的路由
  // routes[0].routes.unshift({
  //   path: '/home1',
  //   component: require('./pages/home').default,
  // });
  // 但使用之后，404页面失效？
};

export function render(oldRender) {
  // console.log(oldRender);
  // 权限校验
  // 用什么参数做校验？我起码要知道用户信息和路由信息啊
  let permission = true;
  if (permission) {
    oldRender();
  }
}

export function onRouteChange({ location, routes, action }) {
  // console.log('执行', { location, routes, action })
}
