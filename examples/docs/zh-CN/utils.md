@(vue学习)
### 工具函数
```js
├── src  //工具文件
│   ├── config
│   ├── directives
│   ├── index.js
│   ├── locale
│   ├── mixins
│   ├── transitions
│   └── utils
```

### config 配置
* `index.js` 修改环境变量,具体看代码
	*  Environment:环境配置
	*  changeEnvironment  修改配置
	* 使用 import { Environment, changeEnvironment } from 'ycloud-ui'
	* 一般修改配置只是在vue的`main.js`下使用就行,配合`cross-env`插件
	* 命令:` "build:dev": "cross-env NODE_BUILD=dev  npm run build",`
    - ```
        changeEnvironment(process.env.IMAGE_DOWNLOAD ? {
		    IMAGE_DOWNLOAD: process.env.IMAGE_DOWNLOAD
		} : { });
      ```

### directives 指令
* `autoHeight.js` 自动计算高度指令 
	* 使用`v-autoHeight="100"` 后面的100是误差范围,便于调节 
	
* `boxer.js`  图片放大指令
	* 使用`v-boxer='图片地址'`

* `mousewheel.js` 暂时没对外
* `repeat-click.js`暂时没对外用

### fliter 过滤
* `money.js` 金额显示格式化,每3位加个','号
	* 使用`{{1000313 | money }}`
	*  使用`{{1000313 | money('--') }}` 可传参数,当金额为undefined,格式化显示为什么

### mixins 混入
* 这面的函数都是通过`mixins:[xxx,xxx]`混入
* `emitter.js` 校验使用
	* `dispatch` 递归查找父级元素,并触发对应函数
	* 使用 `this.dispatch('ElFormItem', 'el.form.change', params);`
	* `broadcast` 递归查找子级元素,并触发对应函数,用法类似
* `focus.js` 聚焦函数
* `formValid.js` 异步验证函数,一般用于是否重复
	* ``` js
	   {
                validator: this.formValid,
                trigger: 'blur',
                message: '登录账号已存在',
                url: URL.checkLoginAccount,
                params () { //传参
                    return {
                        reverse: true,  // 是否需要反转验证,默认是false不通过
                        loginAccount: this.form.loginAccount
                    };
                },
                beforeValid () { //校验前的操作 ,返回 true时则无需触发验证
                    if (this.type === 'edit') return true;
                }
            }
	 ```
* `linkTo.js` 跳转函数
	* 使用 `this.handleLinkTo('purchase/purchaseOrder',params);`
* `migrating.js` api迁移提示,内部使用
* `tableAutoHeight.js` 自动计算表格高度
	* 前提条件 `table ref必须是'my-table'`
	* 使用mixin后 加table属性 `:max-height="tableHeight"`

## utils 工具
* `import { } from 'ylocud-ui'`
* `axios`请求封装函数,返回`promise`
	*	``` js
		Http(url, data = {}, type = 'post');
		data 可传
		{
			ignoreRepeat:true ,//忽略重复请求
			verifycode: 1231, //验证码,登入使用
			version: 2 //版本,迭代接口使用
		}
		```
* `clickoutside.js` 点击元素外面才会触发的事件 
	* 使用 `<div v-element-clickoutside="handleClose">`
* `double.js` 精度计算
	* 保留小数位数可自行加.toFixed();
	* double.add 加
	* double.sub减
	* double.mul乘
	* double.div除


* `summaries.js` element表单合计
	* 使用 `summaries(param, '合计', ['advancePaymentAmount', 'orderAdvancePayment', 'contractAdvancePayment']);`

* `global.js`
| 函数名称 |    描述 |    参数 | 返回 |
| :--------| :-------- | :--------| :--: |
| parseMoneyPM |格式化金额 | (value, [show = '--']) |  money   |
| getType| 获取js类型 | obj |  "Object|Array|Number|String|null|undefined|symbol|其他"|
| format |格式化时间 | (time, fmt) | yyyy-mm-dd|
| getFileType|获取上传文件类型 | (item) |  返回文件地址 |
| formatFile |格式化文件,获取缩略图 | (item, size[默认100x100]) |  返回文件地址|
| encryption|密码加密 | (password, clientid, token]) |  加密密码 |
| addEvent |监听函数 | (obj, evtype, fn, useCapture]) |  -- |
| delEvent |解除监听函数 | (obj, evtype, fn, useCapture) |  -- |
| downloadFile |下载文件  | (data:下载链接, strFileName:下载文件名,默认不传]) |  -- |
| getSelectValue|获取下拉列表名称 | (id, source = []) |  名称 |
| regexp | 正则 |-- |  --|
```js
export const regexp = {
  phone: /^1\d{10}$/, // 手机电话
  email: /^(?=\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$).{5,50}$/, // 电子邮箱
  ip: /^((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))$/,
  idcard: /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/, // 身份证
  digit: /^[0-9]*$/, // 数字
  bankcard: /^\d{6,50}$/, 
  tel: /^((1\d{10})|(0\d{2,3}-\d{7,8})|(0\d{2,3}\d{7,8}))$/,
  chinese: /^[\u4e00-\u9fa5]*$/, // 匹配中文
  internationalTel: /\d{3}-\d{8}|\d{4}-\d{7}/, // 国际电话
  password1: /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/, // 最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
  password2: /^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$/, // 中等强度密码（密码为7位及以上，大小字母、数字三项中有两项，特殊字符可有可无）
  num: /^\d{1,}$/, //  纯数字正则
  en: /^\d{1,}$/, //  纯英文字母正则
  decimals: /^\d+\.\d+$/, //  是否小数
  integer: /^\d+$/ //  正整数
};

```