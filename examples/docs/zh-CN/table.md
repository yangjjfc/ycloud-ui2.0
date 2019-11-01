## Table 表格

:::demo yl-table 是element table的二开,通过配置参数进行渲染

```html
<yl-table :data="list" :config="config" :page="page">
  <el-table-column
    prop="warehouseNo"
    :label="props.label"
    slot-scope="props"
    :fixed="props.col.fixed"
    slot="warehouseName"
    column-key="warehouseNo"
    :filter-multiple="false"
    :filters="warehouseOptions"
    align="center"
  >
    <template slot-scope="scope">
      <div v-text="scope.row.warehouseName"></div>
    </template>
  </el-table-column>
  <el-table-column
    :label="props.label"
    slot-scope="props"
    prop="bill_date"
    :fixed="props.col.fixed"
    min-width="120"
    sortable="custom"
    align="center"
    slot="billDate"
  >
    <template slot-scope="scope">
      <div v-text="scope.row.billDate"></div>
    </template>
  </el-table-column>
  <el-table-column
    :label="props.label"
    slot-scope="props"
    :fixed="props.col.fixed"
    prop="status"
    min-width="90"
    sortable="custom"
    align="center"
    :filter-multiple="false"
    slot="status"
    column-key="status"
    :filters="openOptions"
  >
    <template slot-scope="scope">
      <div v-html="scope.row.statusX"></div>
    </template>
  </el-table-column>
</yl-table>

<script>
  export default {
    data() {
      return {
        warehouseOptions: [],
        openOptions: [],
        config: {
          name: "otherInStock",
          col: [
            {
              type: "selection",
              width: 60,
              align: "center",
              unSave: true,
              hide: false,
              fixed: true
            },
            {
              type: "index",
              prop: "index",
              label: "序号",
              show: false,
              width: 50,
              align: "center",
              unSave: true,
              fixed: true
            },
            {
              type: "operate",
              label: "操作",
              width: 200,
              show: false,
              btns: [
                {
                  name: "查看",
                  event: this.view //事件
                },
                {
                  name: "编辑1",
                  event: this.view,
                  hide: () => !this.hideEdit() //隐藏
                },
                {
                  name: "编辑2",
                  event: this.view,
                  show: () => this.hideEdit 
                },
                {
                  name: "编辑3",
                  event: this.view,
                  hide: () => !this.hideEdit() // 隐藏
                },
                {
                  name: "编辑4",
                  event: this.view,
                  hide: () => !this.hideEdit() // 隐藏
                }
              ],
              unSave: true,
              fixed: true
            },
            { label: "单据单号", prop: "billNo", width: 170,hide:this.hidess },
            { label: "仓库", slot: "warehouseName" },
            { label: "往来单位", prop: "supplierName" },
            { label: "经办人", prop: "agentName" },
            { label: "单据日期", slot: "billDate" },
            { label: "入库数量", prop: "totalNum" },
            { label: "单据状态", slot: "status" }
          ]
        },
        page: {
          pageIndex: 1,
          pageSize: 20,
          total: 0
        },
        list: [
          {
            createTime: "2018-09-26 13:55:13",
            totalInedNum: 0.0,
            supplierName: "reeeeeeeeeeeeee",
            agentNo: "501710203971",
            supplierNo: "000000203",
            remark: "",
            borrowReturnNum: 0.0,
            invoiceNo: "",
            id: 196,
            warehouseName: "123123",
            inType: "gh",
            billExplain:
              "归还WNR-200A嗜碱细胞有核红细胞溶血素02等共计2行21.00件货品",
            billNo: "QTRKD201809260001",
            totalAmount: 21.0,
            enterpriseNo: "6017401899",
            billType: "QTRKD",
            status: "dsh",
            billDate: "2018-09-26",
            createName: "hzgjmygs",
            deleted: 0,
            totalNum: 21.0,
            agentName: "hzgjmygs",
            createNo: "501710203971",
            warehouseNo: "0000131",
            syncFlag: 0
          },
          {
            createTime: "2018-08-23 14:01:38",
            totalInedNum: 0.0,
            supplierName: "广州奥康生物有限公司",
            agentNo: "501710203971",
            supplierNo: "000000192",
            remark: "",
            borrowReturnNum: 0.0,
            invoiceNo: "",
            id: 191,
            warehouseName: "W1仓库",
            inType: "",
            billExplain: "",
            billNo: "QTRKD201808230001",
            totalAmount: 55.0,
            enterpriseNo: "6017401899",
            billType: "QTRKD",
            status: "cg",
            billDate: "2018-07-07",
            createName: "hzgjmygs",
            deleted: 0,
            totalNum: 2.0,
            agentName: "hzgjmygs",
            createNo: "501710203971",
            warehouseNo: "0000022",
            syncFlag: 0
          },
          {
            createTime: "2018-07-25 13:33:34",
            totalInedNum: 0.0,
            supplierName: "上海广辉医药有限公司",
            agentNo: "501810204135",
            supplierNo: "000000186",
            remark: "",
            borrowReturnNum: 0.0,
            invoiceNo: "",
            id: 79,
            warehouseName: "啥仓库",
            inType: "qt",
            billExplain: "12",
            billNo: "QTRKD-20180725-000016",
            totalAmount: 5.0,
            enterpriseNo: "6017401899",
            billType: "QTRKD",
            status: "cg",
            billDate: "2018-07-07",
            createName: "hzgjmygs",
            deleted: 0,
            totalNum: 3.0,
            agentName: "财务2",
            createNo: "501710203971",
            warehouseNo: "0000075",
            syncFlag: 0
          }
        ]
      };
    },
    components: {},
    methods: {
      sortList() {},
      filterList(...res) {
        console.log(res);
      },
      view() {
        console.log(33333333333333);
      },
      hideEdit() {
        return true;
      },
      hidess(){
        // console.log(this)
      }
    },
    mounted() {
      setTimeout(() => {
        let list =this.list;
        this.list=list.map((item,index)=>{
          item.index =index;
          return item
        })
        console.log("TCL: mounted -> this.list", this.list)
      }, 1000);
    }
  };
</script>
```

:::



### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| config   | 表格的配置项 | Object |  | {} |
| data | 表格显示的数据 | Array    | — | -- |
| max-height  | 表格显示的最大高度 |  Number   |  -- | -- |
| page  | 分页信息,小计,合计用 |  Object   |  -- | -- |
| disabled-confirm-button  | 禁用确认按钮 |  Boolean   |  -- | false |
| hide-submit-button  | 隐藏确认按钮 |  Boolean   |  -- | false |
| hide-cancel-button  | 隐藏取消按钮 |  Boolean   |  -- | false |


### config参数具体
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| name   | 名字,无个性化设置可不传  | String |  | -- |
| col | 行列设置属性 | Array    | [{ label: '', prop: '', slot: '' }] | -- |
| show-total  | 是否显示合计列,此参数需要后端配合 |  Boolean   |  -- | false |
| uselocal  | 是否直接使用本地配置参数,此参数需要后端配合 |  Boolean   |  -- | false |
| container  | 表格显示的容器 |  String   |  'document','dialog' |  |
| limit-height  | 表格高度调整 |  Number   |  -- | 0 |
| dis-auto-height  | 关闭自动计算高度 |  Boolean   |  -- | false |


### col参数具体(表格列配置)
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| type   | 判断各自的类型  | String | [cIndex表示行号(自定义index),operate表示操作栏] | ---  |
| label | 表头名称 | String    | -- | -- |
| prop  | 表格数据展示字段 |  String   |  -- | -- |
| hide  | 是否隐藏该列,支持函数 |  Boolean|Function   |  -- | -- |
| field  | 该字段会使用v-html渲染,一般该字段是html |  String   | -- |  |
| unSave  | 不保存到远程数据库,用于设置表头时使用 |  Boolean   |  -- | true |
| element字段 | 会继承element字段 |  ---   |  -- | --- |

### btns按钮参数具体(按钮)
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| name   | 按钮名称  | String | -- | ---  |
| event | 事件绑定,需要绑定当前this,可用bind | Function    | -- | -- |
| hide  | 为true时隐藏该按钮 |  Boolean|Function   |  -- | -- |
| show  | 为true时显示该按钮 |  Boolean|Function   |  -- | -- |


### Slot

| name | 说明 |
|------|--------|
| content | 表格添加的内容 |
