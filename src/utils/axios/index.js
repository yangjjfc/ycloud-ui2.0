/**
 * axios basic configuration
 */
import axios from 'axios';
// 环境配置
import Mode from 'ycloud-ui/src/config/index';
import Interceptor from './interceptor';
const TimeOut = 15000;
// 初始化拦截器
new Interceptor({ TimeOut, axios }); // eslint-disable-line no-new
// 配置
const configuration = [
  'version', // 版本
  'ignoreRepeat', // 忽略防止重复请求
  'verifycode' // 验证码
];
/**
 * 基础配置
 * 更多配置请参考 https://github.com/axios/axios
 * @param {*} url  请求地址
 * @param {*} data  参数
 * @param {*} type  请求类型,默认post
 */
let Http = async (url, data = {}, type = 'post') => {
  let headers = {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json'
  };
  // 添加header token
  let token = Mode.TOKEN || '', query; 
  // 处理配置
  for (const item of configuration) {
    if (data[item]) {
      headers[item] = data[item];
      delete data[item];
    }
  }
  if (url.split('.').length === 1 || ~url.indexOf('.json')) {
    query = url;
  } else {
    query = 'call?apiCode=' + url + '&jtoken=' + token + '&apiVersion=' + (headers.version || '');
  }
  let config = {
    url: query,
    method: type,
    data: data,
    timeout: TimeOut, // 超时时间
    headers: headers,
    responseType: 'json',
    validateStatus: function (status) {
      return status >= 200 && status < 300; // 默认的
    },
    maxRedirects: 5
  };
  let response = null;
  try {
    response = await axios(config);
  } catch (error) {
    response = Promise.reject(error);
  }
  return response;
};

export default Http;
