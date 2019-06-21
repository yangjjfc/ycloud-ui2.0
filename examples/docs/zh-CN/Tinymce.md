## Tinymce 富文本
:::demo yl-icon使用时 首先要在 `public/index.html` 里引入 Tinymce 的js 包， 然后再使用此组件`<script src="/plugins/tinymce4.7.5/tinymce.min.js"></script>`


```html
<yl-tinymce :height="300" v-model="content" :isUploadBtn="true"/>

<script>
    export default {
        data() {
            return {
                content: '默认内容'
            };
        },
        components:{
        },
        methods: {

        },
        mounted() {
        }
    };

</script>
```
:::


### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value   | 	双向绑定内容 | 	String | -- | -- |
| toolbar | 	需要的功能 | Array    | — | -- |
| menubar  | 菜单栏上的菜单 |  String, Boolean   |  -- | 输入数量超过最大数量 |
| height  | 高度 |  Number   |  -- | -- |
| isUploadBtn  | 是否显示上传按钮 |  Boolean   |  -- | false |