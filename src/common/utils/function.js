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

/************* number *************/
// 对数字进行操作，提前进行检查
export const checkNumber = val => {
  if (val.isNaN()) {
    console.error(`${val}: isNaN`);
    val = 0;
  } else if (typeof val === 'string') {
    val = parseFloat(val);
  }
  return val;
};

// js运算会产生无穷小数，所有的运算都应该收敛,收敛时需要知道截取位数
export const astringe = (val, n = 2) => {
  val = checkNumber(val);
  return parseFloat(val.toFixed(n));
};

// 小数点后两位自动补0，返回string（主要用于价格展示）
export const getPrice = (val, n = 2) => {
  val = checkNumber(val);
  let price = parseFloat(val).toFixed(n);
  return price;
};

// 判断百分比
export const percentage = val => {
  if (typeof val === 'string' && val.indexOf('%') !== -1) {
    const num = parseFloat(val.split('%'));
    return num / 100;
  } else if (typeof val === 'number' && (val >= 0 && val <= 1)) {
    return val;
  }
  return false;
};

/************* Object Filter *************/
// 获取数组中的一项，比如key为val(作为示范保留)
// return arr.filter(item => item["key"] === val)[0]

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
