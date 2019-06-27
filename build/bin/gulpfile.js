'use strict';
var path = require('path');
let root = path.resolve(__dirname, '../../');
const { src, dest } = require('gulp');

function copyImage () {
  return src(root + '/src/utils/img/**')
    .pipe(dest(root + '/lib/utils/img'));
}

exports.build = copyImage; 