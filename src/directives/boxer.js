/* eslint-disable */
import 'ycloud-ui/src/utils/boxer/jquery.fs.boxer.js';
import 'ycloud-ui/src/utils/boxer/jquery.fs.boxer.css';
import { getFileType } from 'ycloud-ui/src/utils/global';

const bind = (el, binding, vnode) => {
  let imgSrc = binding.value;
  if (imgSrc) {
    let type = getFileType(imgSrc);
    if (['pdf', 'image'].includes(type)) {
      $(el).boxer();
    }
  }
  $(el).click(function () {
    return false;
  });
};

export default {
  bind (...rest) {
    bind(...rest);
  },
  update (...rest) {
    bind(...rest);
  }
};