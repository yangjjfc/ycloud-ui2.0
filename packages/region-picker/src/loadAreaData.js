export default {
  init: function () {
    const URL = 'https://cdn.yyigou.com/tools/data.js';
    return new Promise((resolve, reject) => {
      // 如果已加载直接返回
      if (typeof getAreaData !== 'undefined') {
        resolve(getAreaData());
        return true;
      }

      // 插入script脚本
      let scriptNode = document.createElement('script');
      scriptNode.setAttribute('type', 'text/javascript');
      scriptNode.setAttribute('src', URL);
      console.log('loading');
      document.getElementsByTagName('head').item(0).appendChild(scriptNode);
      // 地区数据异步加载回调处理
      scriptNode.onload = function (res) {
        resolve((getAreaData()));
      };
    });
  }
};
