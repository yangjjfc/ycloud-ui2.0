/**
 * axios interceptor 拦截器配置
 */
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css'; // Progress 进度条 样式
// import qs from 'qs';序列化数据
import { Message } from 'element-ui';
// console.log(Message);
// const codeMessage = {
//   200: '服务器成功返回请求的数据。',
//   201: '新建或修改数据成功。',
//   202: '一个请求已经进入后台排队（异步任务）。',
//   204: '删除数据成功。',
//   400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
//   401: '用户没有权限（令牌、用户名、密码错误）。',
//   403: '用户得到授权，但是访问是被禁止的。',
//   404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
//   406: '请求的格式不可得。',
//   410: '请求的资源被永久删除，且不会再得到的。',
//   422: '当创建一个对象时，发生一个验证错误。',
//   500: '服务器发生错误，请检查服务器。',
//   502: '网关错误。',
//   503: '服务不可用，服务器暂时过载或维护。',
//   504: '网关超时。'
// };
/**
 * code : 接口响应返回的code  Array
 * success : 接口返回是否报错 true/false
 * show:{
 *  msg: '登陆过期', //错误提示消息,没有就使用后端返回
 *  href: '/login', //跳转地址
 *  clear: true  //是否要清除session缓存
 * }
 */
const codeResponse = [{
  code: ['SUCCESS', '0'],
  success: true
}, {
  code: ['SESSION_EXPIRED', '5000'], // 登陆过期
  success: false,
  show: {
    msg: '登陆过期',
    href: '/login',
    clear: true   
  }
}, {
  code: ['FAILURE'], // excel导入检验失败code
  success: false
}, {
  code: ['5001'], // 禁用
  success: false,
  show: {
    href: '/login',
    clear: true   
  }
}];
class Interceptor {
  constructor ({ TimeOut, axios }) {
    this.axios = axios;
    this.req = {
      timeout: TimeOut
    }; // 防止同个链接连续请求
    this.request();
    this.response();
  }
  //   isBrowser () { 
  //     return process.client;
  //   }
  requestTimeout (name) {
    setTimeout(() => {
      if (this.req[name]) {
        delete this.req[name];
      }
    }, this.req.timeout);
  }
  // 对请求数据做些什么
  request () {
    this.axios.interceptors.request.use((request) => {
      request.urlGuid = request.url; // 防止同个链接连续请求
      // 本地
      if (~request.url.indexOf('.json')) {
        request.method = 'GET';
        request.url = '/data/' + request.url;
        // 线上
      } else if (request.headers.ignoreRepeat || !this.req[request.urlGuid]) {
        request.url = '/gateway/' + request.url;
        this.req[request.urlGuid] = true;
        this.requestTimeout(request.urlGuid);
      } else if (this.req[request.urlGuid]) {
        return Promise.reject('重复请求' + request.url);
      }
      NProgress.start();
      return request;
    }, (error) => Promise.reject(error));
  }

  // 对响应数据做点什么
  response () {
    this.axios.interceptors.response.use((response) => {
      NProgress.done();
      delete this.req[response.config.urlGuid]; // 防止同个链接连续请求
      if (response.data) {
        for (const item of codeResponse) {
          if (item.code.includes(response.data.code)) {
            if (item.success) {
              return response.data; 
            } else {
              if (item.show) {//eslint-disable-line
                Message.error({
                  showClose: true,
                  message: item.show.msg || `${response.data.message}`,
                  customClass: 'yl-fix-mask'
                });
                item.clear ? sessionStorage.clear() : '';
                item.href ? window.location.href = item.href : '';
              }
              return Promise.reject(response.data);
            }
          } 
        }
        Message.error({
          showClose: true,
          message: `${response.data.message}`,
          customClass: 'yl-fix-mask'
        });
        return Promise.reject({
          req: response.config ? response.config.data : '',
          res: response.data
        });
      }
      return response;
    }, (error) => {
      NProgress.done();
      return Promise.reject(error);
    });
  }
}
export default Interceptor;