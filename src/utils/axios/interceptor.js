/**
 * axios interceptor 拦截器配置
 */
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css'; // Progress 进度条 样式
// import qs from 'qs';序列化数据
import { Message } from 'element-ui';
import { Environment } from 'ycloud-ui/src/config/index';
import codeResponse from './ruleCode';

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
        request.url = Environment.REQUEST_URL + '/gateway/' + request.url;
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
                item.show.clear ? sessionStorage.clear() : '';
                item.show.href ? window.location.href = item.show.href : '';
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
        return Promise.reject(this.formatResponseData(response));
      }
      return response;
    }, (error) => {
      NProgress.done();
      return Promise.reject(error);
    });
  }
  formatResponseData (response) {
    let responsex = {}, apiCode = response.config.url; 
    if (response.config.url.includes('apiCode')) {
      apiCode = response.config.url.split('apiCode')[1];
      if (apiCode) {
        apiCode = apiCode.split('&')[0].replace(/=/g, '');
      }
    }
    try {
      responsex = {
        api: apiCode,
        req: JSON.parse(response.config.data || {}),
        res: response.data
      };
    } catch (error) {
      responsex = {};
    }
    return responsex;
  }
}
export default Interceptor;