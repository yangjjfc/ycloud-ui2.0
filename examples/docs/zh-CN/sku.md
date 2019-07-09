## Sku 商品属性

### 基础用法

:::demo Sku 商品属性

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

| 参数   | 说明                         | 类型   | 可选值             | 默认值             |
| ------ | ---------------------------- | ------ | ------------- |----------- |
| data | sku数据,需要一定格式 | Array |---|---|
| skuName | sku唯一标识 | String |---|'skuId'|
| value | 默认绑定的skuId,支持v-model | [String, Number] |---|--|

### Events

| 事件名称 | 说明         | 回调参数           |
| -------- | ------------ | ------------------ |
| update   | 选中sku组合后的回调 | 选中的skuId |
