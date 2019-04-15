## TableTree 表格树

### 基础用法

:::demo table-tree基于el-table中tree实现方式,继承所有的参数,添加`node`已那种方式为节点
```html
<yl-table-tree :data="tableData">
  <el-table-column prop="date" label="日期" sortable width="180">
  </el-table-column>
  <el-table-column prop="name" label="姓名" sortable width="180">
  </el-table-column>
  <el-table-column prop="address" label="地址"> </el-table-column>
</yl-table-tree>

<script>
  export default {
    data() {
      return {
        tableData: []
      };
    },
    created() {
      setTimeout(() => {
        this.tableData = [
          {
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄",
            children: [
              {
                date: "2016-05-01",
                name: "王小虎",
                address: "上海市普陀区金沙江路 1519 弄",
                children: [
                  {
                    date: "2016-05-01",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1519 弄",
                    children: [
                      {
                        date: "2016-05-01",
                        name: "王小虎",
                        address: "上海市普陀区金沙江路 1519 弄"
                      },
                      {
                        date: "2016-05-01",
                        name: "王小虎",
                        address: "上海市普陀区金沙江路 1519 弄"
                      }
                    ]
                  },
                  {
                    date: "2016-05-01",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1519 弄"
                  }
                ]
              },
              {
                date: "2016-05-01",
                name: "王小虎",
                address: "上海市普陀区金沙江路 1519 弄"
              }
            ]
          }
        ];
      }, 1000);
    }
  };
</script>
```

:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| node   | 父子节点名称 | string | — | children |


### Slot

| name | 说明 |
|------|--------|
| — | table中的内容 |