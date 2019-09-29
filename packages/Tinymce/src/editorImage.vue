<template>
    <div class="upload-container">
        <el-button icon="el-icon-upload" size="mini" type="primary" @click="dialogVisible=true">上传图片
        </el-button>
        <yl-dialog :show.sync="dialogVisible" @submit="handleSubmit" title="上传图片" v-if="dialogVisible">
                <yl-file-upload v-model="fileList" :token="Environment.TOKEN"></yl-file-upload>
        </yl-dialog>
    </div>
</template>

<script>
import YlDialog from 'ycloud-ui/packages/dialog';
import YlFileUpload from 'ycloud-ui/packages/file-upload';
import { Environment } from 'ycloud-ui/src/config';

export default {
  name: 'EditorSlideUpload',
  props: {

  },
  components: {
    YlDialog,
    YlFileUpload
  },
  data () {
    return {
      Environment,
      dialogVisible: false,
      fileList: []
    };
  },
  methods: {
    handleSubmit () {
      this.$emit('successCBK', this.fileList);
      this.fileList = [];
      this.dialogVisible = false;
    }
  }
};
</script>
