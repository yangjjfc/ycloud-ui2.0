import { parseMoneyPM } from 'ycloud-ui/src/utils/global';
import double from 'ycloud-ui/src/utils/double';

/**
 * element表单合计
 * summaries(param, '合计', ['advancePaymentAmount', 'orderAdvancePayment', 'contractAdvancePayment']);
 * 
 * @param{param 表格内置参数 }
 * @param{name 表格显示的名称,'合计' }
 * @param{arr 表格需要合计的字段,数组模式传参 }
 */
export default (param, name, arr) => {
  const { columns, data } = param;
  const sums = [];
  columns.forEach((column, index) => {
    if (index === 0) {
      sums[index] = name;
      return;
    }
    if (arr.includes(column.property)) {
      const values = data.map(item => Number(item[column.property]));
      if (!values.every(value => isNaN(value))) {
        sums[index] = values.reduce((prev, curr) => {
          const value = Number(curr);
          if (!isNaN(value)) {
            return double.add(prev, curr);
          } else {
            return prev;
          }
        }, 0);
        sums[index] = parseMoneyPM(sums[index], 0);
      }
    }
  });
  return sums;
};