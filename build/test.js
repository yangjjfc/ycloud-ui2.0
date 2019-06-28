var fs = require('fs');
var path = require('path');

var utilsList = fs.readdirSync(path.resolve(__dirname, '../src/utils'));
var externals = {};
utilsList.forEach(function (file) {
  file = path.basename(file, '.js');
  externals[`ycloud-ui/src/utils/${file}`] = `ycloud-ui/lib/utils/${file}`;
});
console.log(externals);