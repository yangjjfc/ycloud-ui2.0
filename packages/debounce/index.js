import Debounce from './src/main';

/* istanbul ignore next */
Debounce.install = function(Vue) {
  Vue.component(Debounce.name, Debounce);
};

export default Debounce;
