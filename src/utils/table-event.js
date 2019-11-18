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
export const summaries = (param, name, arr) => {
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

/**
 * 获取合计arr
 * 使用配合 vue watch
 *  'list': function (val) {
 *      this.spanArr = this.getSpanArr();
 *   }
 * @param {* Array 表格list} data 
 * @param {* 唯一标识值} id 
 * @param {* 是否显示num} isShowNum 
 */
export const getSpanArr = (data, id, isShowNum) => {
  let spanArr = [], pos = 0, prevId = '', numArr = [], num = 0;
  for (var i = 0; i < data.length; i++) {
    if (data[i][id] === prevId) {
      spanArr[pos] += 1;
      spanArr.push(0);
      numArr.push(0);
    } else {
      spanArr.push(1);
      pos = i;
      numArr.push(num += 1);
    }
    prevId = data[i][id];
  }
  if (isShowNum) {
    return [spanArr, numArr];  
  } else {
    return spanArr;
  }
};

/**
 * 表格合并使用
 * :span-method="objectSpanMethod"
 * @param {* 默认四个参数} param0  当前行row、当前列column、当前行号rowIndex、当前列号columnIndex四个属性
 * @param {* 计算返回的合计arr} spanArr 
 * @param {* 第几列开始计算合计} spanRow 
 */
export const tableSpanMethod = ({ row, column, rowIndex, columnIndex }, spanArr, spanRow) => {
  if (columnIndex < spanRow) {
    const _row = spanArr[rowIndex] || 0;
    const _col = _row > 0 ? 1 : 0;
    return {
      rowspan: _row,
      colspan: _col
    };
  } else {
    return {
      rowspan: 1,
      colspan: 1
    };
  }
};