import StatusTips from './src/main';

/* istanbul ignore next */
StatusTips.install = function (Vue) {
  Vue.component(StatusTips.name, StatusTips);
};

export default StatusTips;
