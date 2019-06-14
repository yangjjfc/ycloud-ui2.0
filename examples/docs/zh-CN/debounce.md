## Debounce 抖动


### 基础用法 

:::demo 所谓抖动，把在指定时间内可能会多次执行的方法打包成一次。

```html
<yl-debounce time="1000" include="input"  :before="beforeHook">
    <input type="text" v-model="model" @keyup="keyUpCall" />
</yl-debounce>

<script>
  export default {
      data(){
          return {
              model:''
          }
      },
      methods:{
          beforeHook(){
              console.log('do something')
          },
          keyUpCall(){
              console.log(this.model)
          }
      }
  }
</script>
```

:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| include   | 定义缓存组件白名单 | Array, String, RegExp | — |  |
| exclude   | 定义缓存黑名单 | Array, String, RegExp | — |  |
| time   | 实时监听防抖名单 | String, Number | — |  |
| before   | 自定义before钩子 | Function | — |  |