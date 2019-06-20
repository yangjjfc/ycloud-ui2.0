## Tinymce 富文本
:::demo yl-icon使用时需引入阿里iconfont的svg图标
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