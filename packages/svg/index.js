import Svg from './src/main';

/* istanbul ignore next */
Svg.install = function (Vue) {
  Vue.component(Svg.name, Svg);
};

export default Svg;
