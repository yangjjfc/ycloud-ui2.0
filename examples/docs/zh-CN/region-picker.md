## RegionPicker region-picker


### 基础用法
:::demo 设置`layout`，表示需要显示的内容，用逗号分隔，布局元素会依次显示。`page-size` 每页显示个数, `current-page` 当前页码,`change`改变页码或显示数量时回调
```html
 <yl-region-picker :codes.sync="form.regionCode" ></yl-region-picker>

<script>
  export default {
    data() {
      return {
        form: {
            regionCode: '110101',
        }
      };
    }
  };
</script>
```
:::
                                   
