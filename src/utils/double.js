// 精度计算
import { Decimal } from 'decimal.js';
// 保留小数位数可自行加.toFixed();
const double = {
  add: (a, b) => new Decimal(a).add(new Decimal(b)), // 加
  sub: (a, b) => new Decimal(a).sub(new Decimal(b)), // 减
  mul: (a, b) => new Decimal(a).mul(new Decimal(b)), // 乘
  div: (a, b) => new Decimal(a).div(new Decimal(b)) // 除
};

export default double;