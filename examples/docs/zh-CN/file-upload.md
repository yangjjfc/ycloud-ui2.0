## FileUpload file-upload


:::demo yl-icon使用时需引入阿里iconfont的svg图标
```html
<yl-file-upload v-model="val"></yl-file-upload>
<script>
  export default {
    data() {
      return {
       val:'s2/M00/26/35/rB4r9V3JMoGAM4WfAAWyhJ07vXM753.jpg'
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
| string  | 是否是字符串形式返回,true为是,false为数组形式返回 |  Boolean   |  -- | true |
| join  | 配合string-->true时才生效,字符串输出是默认用';'合并,也可以自定义 |  Boolean   |  -- | true |
| token  | 自定义token,默认无需上传 |  ''   |  -- | '' |
| disable  | 是否禁用 |  Boolean   |  -- | false |
| showDown  | 是否显示下载 |  Boolean   |  -- | false |

### Slot

| name | 说明 |
|------|--------|
| imgs | slot |

### Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| success  | 上传成功后回调函数  | img,list  |



### Methods
| 方法名      | 说明    | 参数      |
| fourceUpdate | 用于强制刷新图片显示,主要用于图片的二次更新 |--|