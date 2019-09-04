import queryString from 'query-string';
import copy_to_clipboard from 'copy-to-clipboard';

// 将obj合并到array
export const injectColumns = (arr, obj) => {
  let newArr = arr.map(item => {
    const key = item.dataIndex;
    if (obj[key]) {
      return { ...item, ...obj[key] };
    }
    return item;
  });
  return newArr;
};

// 复制：结构中只能包含number，string等常用格式，二进制格式无法复制
export const copy = obj => {
  return JSON.parse(JSON.stringify(obj));
};

// 复制到剪切板
export const copyToClipboard = str => {
  if (copy_to_clipboard(str)) {
    console.log('复制成功！');
  } else {
    console.log('复制失败！');
  }
};

/************* Filter *************/
// 获取数组中的一项
export const getItemByValue = (arr = [], val = '') => {
  let newArr = arr.filter(item => item.value === val);
  return newArr[0];
};

// 通用过滤对象
export const objFilter = (obj = {}, filter = () => {}) => {
  let newObj = {};
  for (let i in obj) {
    if (filter(obj[i])) {
      newObj[i] = obj[i];
    }
  }
  return newObj;
};

// 过滤对象，返回所需的keys
export const objFilterByKeys = (obj = {}, keys = []) => {
  if (!keys || keys.length === 0) return obj;
  let newObj = {};
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    if (obj[key]) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
};

/*********** UrlQuery ***********/
// 过滤urlQuery对象
export const getQueryByKeys = (keys = []) => {
  // let search = window.location.search.slice(1);
  // let list = search.split("&");
  // let newObj = {}
  // for (let i = 0; i < list.length; i++) {
  //   let k = list[i].split("=");
  //   newObj[k[0]] = k[1]
  // }
  let query = Object.assign({}, queryString.parse(window.location.search));
  return objFilterByKeys(query, keys);
};

// 将参数填入url中
export const setQueryToUrl = (payload = {}) => {
  let newQuery = Object.assign({}, getQueryByKeys(), payload);
  newQuery = objFilter(newQuery, item => item || item === 0); // item存在或者item等于0

  window.history.replaceState(null, null, '?' + queryString.stringify(newQuery));
};

/************* Date *************/
// 时间格式化 "yyyy年M月d日 hh:mm:ss"
export const dateFtt = (date, fmt = 'yyyy年M月d日 hh:mm:ss') => {
  let o = {
    'M+': date.getMonth() + 1, //月份
    'd+': date.getDate(), //日
    'h+': date.getHours(), //小时
    'm+': date.getMinutes(), //分
    's+': date.getSeconds(), //秒
    'q+': Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  for (let k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length),
      );
  return fmt;
};

/************* Price *************/
// 小数点后两位自动补0
export const returnFloat = (value = 0) => {
  value = Math.round(parseFloat(value) * 100) / 100 || 0;
  let xsd = value.toString().split('.');
  if (xsd.length === 1) {
    value = value.toString() + '.00';
    return value;
  }
  if (xsd.length > 1) {
    if (xsd[1].length < 2) {
      value = value.toString() + '0';
    }
    return value;
  }
};
// 小数点后N位自动补0

/************* image *************/
// 图片加载之后执行
export const loadImage = (url, callback) => {
  let img = new Image(); //创建一个Image对象，实现图片的预下载
  img.src = url;
  if (img.complete) {
    // 如果图片已经存在于浏览器缓存，直接调用回调函数
    callback.call(img);
    return;
  }
  img.onload = () => {
    //图片下载完毕时异步调用callback函数。
    callback.call(img); //将回调函数的this替换为Image对象
  };
};

/************* window *************/

//阻止事件冒泡
export const stopBubble = e => {
  if (e && e.stopPropagation) {
    e.stopPropagation();
  } else {
    window.event.cancelBubble = true;
  }
};

//判断当中文输入法输入时，cpLock开(true)
export const cpCheck = () => {
  // CPLOCK = false;
  // jQuery("form").on('compositionstart', "input,textarea", function(e) {
  //     CPLOCK = true;
  // });
  // jQuery("form").on('compositionend', "input,textarea", function(e) {
  //     CPLOCK = false;
  // });
};

/************* mobile *************/

//检测 屏幕尺寸发生变化
export const resize = (fn = () => {}) => {
  let prev_ori = window.orientation;
  window.addEventListener(
    'resize',
    () => {
      if (prev_ori !== window.orientation) {
        prev_ori = window.orientation;
        fn();
      } else if (!window.orientation) fn();
    },
    false,
  );
};

//判断ios
export const check_ios = (fn = () => {}) => {
  let u = navigator.userAgent;
  let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  if (isiOS) {
    fn();
    return true;
  } else return false;
};

//判断android
export const check_android = (fn = () => {}) => {
  let u = navigator.userAgent;
  let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  if (isAndroid) {
    fn();
    return true;
  } else return false;
};

//判断微信
export const isWeiXin = (fn = () => {}) => {
  let ua = window.navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) === 'micromessenger') {
    fn();
    return true;
  } else return false;
};
