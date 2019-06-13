const path = require('path');
// process.cwd() 方法返回 Node.js 进程的当前工作目录。
const templates = path.resolve(process.cwd(), './examples/pages/template');
// Nodejs文件监控chokidar
const chokidar = require('chokidar');
let watcher = chokidar.watch([templates]);
// 监听
watcher.on('ready', function () {
  watcher
    .on('change', function () {
      exec('npm run i18n');
    });
});

function exec (cmd) {
  return require('child_process').execSync(cmd).toString().trim();
}
