import ExcelUpload from './src/main';

/* istanbul ignore next */
ExcelUpload.install = function (Vue) {
  Vue.component(ExcelUpload.name, ExcelUpload);
};

export default ExcelUpload;
