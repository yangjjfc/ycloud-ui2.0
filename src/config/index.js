/*
 * @Author: yangjj
 * @Date: 2019-06-24 09:08:18
 * @LastEditors: yangjj
 * @LastEditTime: 2019-07-18 16:34:17
 * @Description: 全局环境配置文件,使用时必须是import,而不能require
 */

export let Environment = {
  IMAGE_DOWNLOAD: 'http://dfs.test.cloudyigou.com/dfs/', // 图片下载服务器地址
  IMG_SIZE_MAX: '5242880',
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
