## Sku 商品属性

### 基础用法

:::demo 设置`layout`，表示需要显示的内容，用逗号分隔，布局元素会依次显示。`page-size` 每页显示个数, `current-page` 当前页码,`change`改变页码或显示数量时回调

```html
<yl-sku :data="data" v-model="skuId"></yl-sku>

<script>
  export default {
    data() {
      return {
        data: [],
        skuId: "3158054"
      };
    },
    created() {
      setTimeout(() => {
        this.data = [
          { 颜色: "红", 尺码: "大", 型号: "A", skuId: "3158055" },
          { 颜色: "白", 尺码: "大", 型号: "A", skuId: "3158054" },
          { 颜色: "白", 尺码: "中", 型号: "B", skuId: "3133859" },
          { 颜色: "蓝", 尺码: "小", 型号: "C", skuId: "3516833" }
        ];
      }, 500);
    },
    methods: {}
  };
</script>
```

:::

### Attributes

| 参数   | 说明                         | 类型   | 可选值                                            | 默认值                                  |
| ------ | ---------------------------- | ------ | ------------------------------------------------- | --------------------------------------- |
| layout | 组件布局，子组件名用逗号分隔 | String | sizes, prev, pager, next, jumper, ->, total, slot | total, sizes, prev, pager, next, jumper |

### Events

| 事件名称 | 说明         | 回调参数           |
| -------- | ------------ | ------------------ |
| change   | 改变页码回调 | pageIndex,pageSize |
