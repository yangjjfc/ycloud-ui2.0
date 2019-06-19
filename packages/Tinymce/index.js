import Tinymce from './src/main';

/* istanbul ignore next */
Tinymce.install = function (Vue) {
  Vue.component(Tinymce.name, Tinymce);
};

export default Tinymce;
