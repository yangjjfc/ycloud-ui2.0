/*
 * @Author: yangjj
 * @Date: 2019-06-24 09:08:18
 * @LastEditors: yangjj
 * @LastEditTime: 2020-04-14 14:21:56
 * @Description: 全局环境配置文件,使用时必须是import,而不能require
 */

export let Environment = {
  REQUEST_URL: '', // 请求地址
  IMAGE_DOWNLOAD: 'http://dfs.test.cloudyigou.com/dfs/', // 图片下载服务器地址
  IMG_SIZE_MAX: '5242880',
  SENTRY_DSN: '', // sentry的dsn
  USER_SENTRY: false, // sentry的开关
  NODE_ENV: 'development', // 开发环境,区分本地线上
  USER_ENVIRONMENT: 'dev', // 环境
  RELEASE: '1.1', // 版本
  USERINFO: {}, // 用户信息
  TABLE: { // 表格配置
    mode: 'local',
    get: null, // callback 函数
    save: null // callback 函数
  },
  TOKEN: '5ea16aaa421abfbfa3514c60a6244262' // 用户登入凭证
};

if (process.env.NODE_ENV === 'production') {
  Environment = { ...Environment, 
    ...{
      IMAGE_DOWNLOAD: 'http://dfs.dev.cloudyigou.com/dfs/'
    }
  };
}

export const changeEnvironment = (obj) => {
  Environment = { ...Environment, ...obj };
};
