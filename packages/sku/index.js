import Sku from './src/main';

/* istanbul ignore next */
Sku.install = function(Vue) {
  Vue.component(Sku.name, Sku);
};

export default Sku;
