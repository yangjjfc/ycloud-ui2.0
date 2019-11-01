/* Automatically generated by './build/bin/build-entry.js' */

import Pagination from '../packages/pagination/index.js';
import Dialog from '../packages/dialog/index.js';
import FileUpload from '../packages/file-upload/index.js';
import TableTree from '../packages/table-tree/index.js';
import RegionPicker from '../packages/region-picker/index.js';
import Icon from '../packages/icon/index.js';
import Tinymce from '../packages/Tinymce/index.js';
import Table from '../packages/table/index.js';
import Sku from '../packages/sku/index.js';
import StatusTips from '../packages/status-tips/index.js';
import CollapseTransition from 'ycloud-ui/src/transitions/collapse-transition';
import Http from 'ycloud-ui/src/utils/axios/index';
import * as Tools from 'ycloud-ui/src/utils/global';
import double from 'ycloud-ui/src/utils/double';
import summaries from 'ycloud-ui/src/utils/summaries';
import emitter from 'ycloud-ui/src/mixins/emitter';
import formValid from 'ycloud-ui/src/mixins/formValid';
import focus from 'ycloud-ui/src/mixins/focus';
import linkTo from 'ycloud-ui/src/mixins/linkTo';
import tableAutoHeight from 'ycloud-ui/src/mixins/tableAutoHeight';
import boxer from 'ycloud-ui/src/directives/boxer';
import autoHeight from 'ycloud-ui/src/directives/autoHeight';
import money from 'ycloud-ui/src/fliters/money';
import { Environment, changeEnvironment } from 'ycloud-ui/src/config';

const components = [
  Pagination,
  Dialog,
  FileUpload,
  TableTree,
  RegionPicker,
  Icon,
  Tinymce,
  Table,
  Sku,
  StatusTips,
  CollapseTransition
];

const install = function (Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
  Vue.prototype.Http = Http;
  Vue.directive('boxer', boxer);
  Vue.directive('autoHeight', autoHeight);
  Vue.filter('money', money);
}; 

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export {
  emitter,
  focus,
  linkTo,
  tableAutoHeight,
  formValid,
  Http,
  Environment,
  changeEnvironment,
  Tools,
  double,
  summaries
};

export default {
  version: '2.1.25',
  install,
  CollapseTransition,
  Pagination,
  Dialog,
  FileUpload,
  TableTree,
  RegionPicker,
  Icon,
  Tinymce,
  Table,
  Sku,
  StatusTips
};
