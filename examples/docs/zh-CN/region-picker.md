## RegionPicker region-picker


### 基础用法
:::demo 设置`codes`，就能显示三级省市区
```html
 <yl-region-picker :codes.sync="form.regionCode" @input="inputEvent" @change="changeEvent" ></yl-region-picker>

<script>
  export default {
    data() {
      return {
        form: {
            regionCode: '140100',
        }
      };
    },
    methods:{
      inputEvent(names){
        console.log(names)
      },
      changeEvent(code){
        console.log(code)
      }
    }
  };
</script>
```
:::
                                   
### Attributes
| 参数      | 说明          | 类型      | 可选值                          | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| codes   | 区编码,支持sync | String, Number | — | '' |
| validate   | change时是否触发验证 | Boolean | — | true |
| disabled   | 是否禁用 | Boolean | — | false |
| twoSelect   | 是否是二级联动 | Boolean | — | false |

### Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| input  | 获取全部名称 |   |
| change  | 获取区编码 |   |
