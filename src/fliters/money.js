/**
 * 格式化金额
 * @param {value } 金额
 * @param {show } 当金额为undefined,显示,默认是'--'
 */
import { parseMoney } from 'ycloud-ui/src/utils/global';

const meony = (value, show = '--') => {
  value = Number(value);
  if (value === 0) {
    return '0.00';
  }
  if (!value) {
    return show;
  }
  let title = value < 0 ? '-' : '';
  return title + parseMoney(Math.abs(value));
};

export default meony;