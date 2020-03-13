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
import MultiSelectPage from '../packages/multi-select-page/index.js';
import ExcelUpload from '../packages/excel-upload/index.js';
import CollapseTransition from 'ycloud-ui/src/transitions/collapse-transition';
import Http from 'ycloud-ui/src/utils/axios';
import * as Tools from 'ycloud-ui/src/utils/global';
import double from 'ycloud-ui/src/utils/double';
import sentry from 'ycloud-ui/src/utils/sentry';
import * as tableEv from 'ycloud-ui/src/utils/table-event';
import emitter from 'ycloud-ui/src/mixins/emitter';
import formValid from 'ycloud-ui/src/mixins/formValid';
import focus from 'ycloud-ui/src/mixins/focus';
import linkTo from 'ycloud-ui/src/mixins/linkTo';
import tableAutoHeight from 'ycloud-ui/src/mixins/tableAutoHeight';
import boxer from 'ycloud-ui/src/directives/boxer';
import autoHeight from 'ycloud-ui/src/directives/autoHeight';
import money from 'ycloud-ui/src/fliters/money';
import { Environment, changeEnvironment } from 'ycloud-ui/src/config/index';

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
  MultiSelectPage,
  ExcelUpload,
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
  tableEv,
  sentry
};

export default {
  version: '2.1.43',
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
  StatusTips,
  MultiSelectPage,
  ExcelUpload
};
