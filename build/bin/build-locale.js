var fs = require('fs');
var save = require('file-save');
var resolve = require('path').resolve;
var basename = require('path').basename;
var localePath = resolve(__dirname, '../../src/locale/lang'); // 读取lang下的文件目录
var fileList = fs.readdirSync(localePath); // 获取全部文件名称
//   [ 'af-ZA.js',
// ...
// 'zh-TW.js' ]
var transform = function (filename, name, cb) {
  require('babel-core').transformFile(resolve(localePath, filename), {
    plugins: [
      'add-module-exports', // 去除.default
      ['transform-es2015-modules-umd', { loose: true }] // 导出umd格式
    ],
    moduleId: name
  }, cb);
};

fileList
  .filter(function (file) {
    return /\.js$/.test(file);
  })
  .forEach(function (file) {
    // path.basename('/foo/bar/baz/asdf/quux.html', '.html');
    // 返回: 'quux'
    var name = basename(file, '.js');
    // 'zh-TW'
    transform(file, name, function (err, result) {
      if (err) {
        console.error(err);
      } else {
        var code = result.code; // 生成的结果
        code = code
          .replace('define(\'', 'define(\'element/locale/')
          .replace('global.', 'global.ELEMENT.lang = global.ELEMENT.lang || {}; \n    global.ELEMENT.lang.');
        save(resolve(__dirname, '../../lib/umd/locale', file)).write(code);
      }
    });
  });
