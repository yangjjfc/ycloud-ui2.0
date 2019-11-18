## ExcelUpload excel-upload 文件导入

### 基础用法
:::demo 分页记录选择
```html
  <yl-excel-upload v-bind="upload" @upload="readFile"></yl-excel-upload>

<script>
  export default {
    data() {
      return {
          upload: {
            fileType: ['txt', 'docx', 'doc', 'pdf', 'rar', 'zip']
        }
      };
    },
    mounted(){
    },
    methods:{
      readFile(flies){
        console.log("TCL: readFile -> flies", flies)
      }
    }
  };
</script>
```
:::


                                   
### Attributes
| 参数      | 说明          | 类型      | 可选值                          | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| action   | 上传地址 | String | — | '/gateway/upload' |
| params   | 添加额外参数 | Object | — | {} |
| fileType   | 支持的文件类型 | Array | — | [] |
| token   | 可自行传token | String | — | '' |
| message   | 文件类型错误提示 | Array | — | '请上传excel文件' |
| classx   | 自定义class | String | — | -- |

### Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| upload  | 上传成功后触发 | files  |
| init  | 当文件为ready状态,文件改变时触发,配合excel上传清空状态使用 | --  |
