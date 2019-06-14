## Throttle 节流


### 基础用法 

:::demo 所谓节流，就是指连续触发事件但是在 n 秒中只执行一次函数。节流会稀释函数的执行频率。

```html
<yl-throttle time="1000" include="input"  :before="beforeHook">
    <input type="text" v-model="model" @keyup="keyUpCall" />
</yl-throttle>

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
| time   | 定义节流时间间隔 | String, Number | — |  |
| before   | 自定义before钩子 | Function | — |  |