var path = require('path');
var fs = require('fs');
var nodeExternals = require('webpack-node-externals'); // 防止将某些 import 的包(package)打包到 bundle 中
var Components = require('../components.json');

var utilsList = fs.readdirSync(path.resolve(__dirname, '../src/utils'));
var utilsConfig = fs.readdirSync(path.resolve(__dirname, '../src/config'));
var mixinsList = fs.readdirSync(path.resolve(__dirname, '../src/mixins'));
var flitersList = fs.readdirSync(path.resolve(__dirname, '../src/fliters'));
var transitionList = fs.readdirSync(path.resolve(__dirname, '../src/transitions'));
var externals = {};

Object.keys(Components).forEach(function (key) {
  externals[`ycloud-ui/packages/${key}`] = `ycloud-ui/lib/${key}`;
});
externals['ycloud-ui/src/locale'] = 'ycloud-ui/lib/locale';
utilsList.forEach(function (file) {
  file = path.basename(file, '.js');
  externals[`ycloud-ui/src/utils/${file}`] = `ycloud-ui/lib/utils/${file}`;
});
utilsConfig.forEach(function (file) {
  file = path.basename(file, '.js');
  externals[`ycloud-ui/src/config/${file}`] = `ycloud-ui/lib/config/${file}`;
});

mixinsList.forEach(function (file) {
  file = path.basename(file, '.js');
  externals[`ycloud-ui/src/mixins/${file}`] = `ycloud-ui/lib/mixins/${file}`;
});
transitionList.forEach(function (file) {
  file = path.basename(file, '.js');
  externals[`ycloud-ui/src/transitions/${file}`] = `ycloud-ui/lib/transitions/${file}`;
});
flitersList.forEach(function (file) {
  file = path.basename(file, '.js');
  externals[`ycloud-ui/src/fliters/${file}`] = `ycloud-ui/lib/fliters/${file}`;
});
externals = [Object.assign({
  vue: 'vue'
}, externals), nodeExternals({
  whitelist: ['element-ui']
})];

exports.externals = externals;

exports.alias = {
  main: path.resolve(__dirname, '../src'),
  packages: path.resolve(__dirname, '../packages'),
  examples: path.resolve(__dirname, '../examples'),
  'ycloud-ui': path.resolve(__dirname, '../')
};

exports.vue = {
  root: 'Vue',
  commonjs: 'vue',
  commonjs2: 'vue',
  amd: 'vue'
};

exports.jsexclude = /node_modules|utils\/popper\.js|utils\/date.\js/;
