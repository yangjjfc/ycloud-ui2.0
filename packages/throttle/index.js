import Throttle from './src/main';

/* istanbul ignore next */
Throttle.install = function (Vue) {
  Vue.component(Throttle.name, Throttle);
};

export default Throttle;
