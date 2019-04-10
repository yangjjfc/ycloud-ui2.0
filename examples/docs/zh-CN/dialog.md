## Dialog

弹出一个对话框

### 基本用法

Dialog 弹出一个对话框，适合需要定制性更大的场景。继承element的全部属性和方法,改写 `visible` 为 `show` ;
:::demo 需要设置`show`属性，它接收`Boolean`，当为`true`时显示 Dialog。Dialog 分为两个部分：`content`和`footer`，`footer`需要具名为`footer`的`slot`。`content`需要具名为`content`的`slot`。

```html
<el-button type="text" @click="show = true">点击打开 Dialog</el-button>

<yl-dialog title="选择批号"  :show.sync="show" width="1200px" @submit="submit">
    <div>
        <li>1</li>
    </div>
    <span slot='footer' style="margin-right:10px">
        <el-button type="primary" size="small">暂存</el-button>
        <el-button type="primary" size="small">暂存</el-button>
        <el-button type="primary" size="small">暂存</el-button>
        <el-button type="primary" size="small">暂存</el-button>
    </span>
</yl-dialog>

<script>
  export default {
    data() {
      return {
        show: false
      };
    },
    methods: {
      submit(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          }).catch(_ => {
              this.show=false
          });
      }
    }
  };
</script>
```
:::


### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| show   | 是否显示 Dialog，支持 .sync 修饰符 | boolean | — | false |
| close-on-click-modal | 是否可以通过点击 modal 关闭 Dialog | boolean    | — | false |
| close-button-text  | 关闭按钮text |  String   |  -- | 关闭 |
| confirm-button-text  | 确认按钮text |  String   |  -- | 确定 |
| disabled-confirm-button  | 禁用确认按钮 |  Boolean   |  -- | false |
| hide-submit-button  | 隐藏确认按钮 |  Boolean   |  -- | false |
| hide-cancel-button  | 隐藏取消按钮 |  Boolean   |  -- | false |


### Slot

| name | 说明 |
|------|--------|
| — | Dialog 的内容 |
| title | Dialog 标题区的内容 |
| footer | Dialog 按钮操作区的内容 |

### Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| submit  | 确认事件后回调函数 |   |
| reset | 取消事件后回调函数 |  |