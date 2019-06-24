/*
 * @Author: yangjj
 * @Date: 2019-06-24 09:08:18
 * @LastEditors: yangjj
 * @LastEditTime: 2019-06-24 14:22:52
 * @Description: 全局环境配置文件,使用时必须是import,而不能require
 */

let config = {
  IMAGE_DOWNLOAD: 'http://dfs.test.cloudyigou.com/dfs/', // 图片下载服务器地址
  IMG_SIZE_MAX: '5242880',
  TOKEN: '5a4bae1349626eca4a654081618dd4d9' // 用户登入凭证
};

if (process.env.NODE_ENV === 'production') {
  config = { ...config, 
    ...{
      IMAGE_DOWNLOAD: 'http://dfs.dev.cloudyigou.com/dfs/'
    }
  };
}

export const changeConfig = (obj) => {
  config = { ...config, ...obj };
};

export default config;