var Components = require('../../components.json');
var fs = require('fs');
var render = require('json-templater/string'); // JSON模板化
var uppercamelcase = require('uppercamelcase');// 大写驼峰 foo-bar→FooBar
var path = require('path');
var endOfLine = require('os').EOL; // 定义操作系统相关的行末标志

var OUTPUT_PATH = path.join(__dirname, '../../src/index.js');
var IMPORT_TEMPLATE = 'import {{name}} from \'../packages/{{package}}/index.js\';';
var INSTALL_COMPONENT_TEMPLATE = '  {{name}}';
var MAIN_TEMPLATE = `/* Automatically generated by './build/bin/build-entry.js' */

{{include}}
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
{{install}},
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
  version: '{{version}}',
  install,
  CollapseTransition,
{{list}}
};
`;

delete Components.font;

var ComponentNames = Object.keys(Components); // 获取键值

var includeComponentTemplate = [];
var installTemplate = [];
var listTemplate = [];

ComponentNames.forEach(name => {
  var componentName = uppercamelcase(name);

  includeComponentTemplate.push(render(IMPORT_TEMPLATE, {
    name: componentName,
    package: name
  }));

  if (['Loading', 'MessageBox', 'Notification', 'Message'].indexOf(componentName) === -1) {
    installTemplate.push(render(INSTALL_COMPONENT_TEMPLATE, {
      name: componentName,
      component: name
    }));
  }

  if (componentName !== 'Loading') listTemplate.push(`  ${componentName}`);
});

var template = render(MAIN_TEMPLATE, {
  include: includeComponentTemplate.join(endOfLine),
  install: installTemplate.join(',' + endOfLine),
  version: process.env.VERSION || require('../../package.json').version,
  list: listTemplate.join(',' + endOfLine)
});

fs.writeFileSync(OUTPUT_PATH, template);
console.log('[build entry] DONE:', OUTPUT_PATH);
