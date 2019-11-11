## MultiSelectPage 分页记录选择


### 基础用法
:::demo 分页记录选择
```html
  <yl-multi-select-page v-bind="multiSelect" ref="multiSelectPage" @update="emitUpdate">
      <template #left>
        <el-table :data="list" stripe style="width: 100%" border size="small" ref="my-table" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center"> </el-table-column>
          <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
          <el-table-column prop="goodsLineName" label="产品线"></el-table-column>
          <el-table-column prop="provinceName" label="授权区域"></el-table-column>
          <el-table-column prop="enterpriseName" label="经销商名称/终端客户"></el-table-column>
        </el-table>
    </template>
</yl-multi-select-page>

<script>
  export default {
    data() {
      return {
        list: [],
         multiSelect: {
            id: 'enterpriseNo',
            value: 'enterpriseName',
            title: '选中的经销商',
            height:'600',
            list: [],
            oList: [],
            checked: []
        }
      };
    },
    mounted(){
        this.list = [{"enterpriseNo":"6020000005","enterpriseName":"默默企业"},{"goodsLineName":"质控品,发光试剂,自免试剂,自免仪器","enterpriseNo":"6020000006","goodsLine":"ZK,FG_SJ,ZM_SJ,ZM_YQ","enterpriseName":"云南盛时迪安生物科技有限公司"},{"enterpriseNo":"6020000024","enterpriseName":"默默的陌陌"},{"goodsLineName":"发光试剂","enterpriseNo":"6020000025","goodsLine":"FG_SJ","enterpriseName":"加菲猫"},{"enterpriseNo":"6020000026","enterpriseName":"叶恩楷测试公司"},{"enterpriseNo":"6020000028","enterpriseName":"小默测试企业11"},{"goodsLineName":"自免仪器,质控品,自免试剂,发光试剂","enterpriseNo":"6020000029","goodsLine":"ZM_YQ,ZK,ZM_SJ,FG_SJ","enterpriseName":"杭州迪安医学检验中心有限公司"},{"enterpriseNo":"6020000041","enterpriseName":"叶恩楷测试03公司"},{"goodsLineName":"发光试剂,质控品","enterpriseNo":"6020000048","goodsLine":"FG_SJ,ZK","enterpriseName":"杭州云医购供应链科技有限公司"},{"goodsLineName":"质控品","enterpriseNo":"6020000049","goodsLine":"ZK","enterpriseName":"佛山迪安医学检验实验室有限公司"},{"goodsLineName":"发光试剂","enterpriseNo":"6020000050","goodsLine":"FG_SJ","enterpriseName":"于磊测试企业"},{"goodsLineName":"发光耗材,发光试剂","enterpriseNo":"6020000051","goodsLine":"FG_HC,FG_SJ","enterpriseName":"测试企业"},{"enterpriseNo":"6020000061","enterpriseName":"天侧门"}]
        this.multiSelect.list=this.list;
    },
    methods:{
      emitUpdate(rows){
        console.log("TCL: emitUpdate -> rows", rows)
      },
      handleSelectionChange(row){
          this.multiSelect.checked = row;
      }
    }
  };
</script>
```
:::


                                   
### Attributes
| 参数      | 说明          | 类型      | 可选值                          | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| title   | 显示名称,必填 | String | — | '' |
| id   | 匹配的关键id,唯一性,必填 | String | — | '' |
| value   | 显示的tag名称,必填 | String | — | '' |
| height   | 右侧高度 | String | — | '400' |
| list   | 获取列表数据,必填 | Array | — | -- |
| oList   | 默认选中 | Array | — | [] |
| checked   | 当前选中,table选择时触发赋值 | Array | — | [] |

### Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| update  | 返回选中的list |   |
