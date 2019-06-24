## FileUpload file-upload


:::demo yl-icon使用时需引入阿里iconfont的svg图标
```html
<yl-file-upload v-model="val"></yl-file-upload>
<script>
  export default {
    data() {
      return {
       val:'s2/M00/26/05/rB4r9VxMIeWAPWp-AA6kkFSNdr4321.png'
      };
    },
    methods: {
     
    }
  };
</script>
```
:::


### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| action   | 上传地址 | String | — | '/gateway/upload' |
| listType | 显示类型 | String    | — | 'picture-card' |
| limit  | 最大上传数量 |  Number, String   | -- | -- |
| supportType  | 支持上传的文件类型 |  String   |  'img', 'file', 'all'  | 'all' |
| drag  | 是否能拖拽 |  Boolean   |  -- | false |
| value  | 图片地址 |  String, Array,字符串已';'分割   |  -- | -- |
| hideUploadBtn  | 隐藏上传按钮 |  Boolean   |  -- | false |
| validateEvent  | 是否验证 |  Boolean   |  -- | true |


### Slot

| name | 说明 |
|------|--------|
| imgs | slot |

### Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| success  | 上传成功后回调函数  | img,list  |