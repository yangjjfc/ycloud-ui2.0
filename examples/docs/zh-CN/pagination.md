## Pagination 分页组件


### 基础用法
:::demo 设置`layout`，表示需要显示的内容，用逗号分隔，布局元素会依次显示。`page-size` 每页显示个数, `current-page` 当前页码,`change`改变页码或显示数量时回调
```html
<yl-pagination :total="page.total" :page-size.sync="page.pageSize" :current-page.sync="page.pageIndex" @change="getList"></yl-pagination>

<script>
  export default {
    data() {
      return {
        page: {
            pageIndex: 1,
            pageSize: 20,
            total:300
        }
      };
    },
    methods: {
       getList(pageIndex=this.page.pageIndex,pageSize=this.page.pageSize){
          console.log(pageIndex);
          console.log(pageSize);
          setTimeout(() => {
            this.page.pageIndex=pageIndex;
            this.page.pageSize=pageSize;
          }, 500);
        }
    }
  };
</script>
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| layout   | 组件布局，子组件名用逗号分隔 | String |sizes, prev, pager, next, jumper, ->, total, slot | total, sizes, prev, pager, next, jumper |


### Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| change  | 改变页码回调 |  pageIndex,pageSize |