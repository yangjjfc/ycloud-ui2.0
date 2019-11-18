<template>
  <div class="yl-excel-upload">
    <el-upload ref="upload" :action="action" :headers="headers" :data="params" :file-list="fileList" list-type="text" :on-success="success" :show-file-list="false" class="upload-excel" :on-error="errors" :before-upload="beforeUpload" :limit="2" :multiple="multiple" :drag="drag" :class="classx" :auto-upload="false" :on-change="onChange" :on-exceed="exceed">
      <slot name='imgs'></slot>
      <el-input placeholder="文件名" class="w300 mgr5" v-model="fileName" size="small" :readonly="true"></el-input>
      <el-button type="primary" slot="trigger" size="small" class="btn-browse mgr5">浏览...</el-button>
      <el-button size="small" @click="submitUpload" type="primary" :disabled="disBtn">导入excel</el-button>
      <slot></slot>
    </el-upload>
  </div>
</template>

<script>
import { Environment } from 'ycloud-ui/src/config';

export default {
  name: 'YlExcelUpload',
  data () {
    return {
      disBtn: true,
      fileList: [],
      fileName: '',
      multiple: false, // 支持多张上传
      imgUrls: [],
      headers: {}, // 添加请求头{}
      drag: false // 是否支持拖拽上传
    };
  },
  props: {
    classx: { // 自定义class
      type: String
    },
    action: {// 上传地址
      type: String,
      default: '/gateway/upload'
    },
    params: { // 添加额外参数
      type: Object,
      default: () => ({})
    },
    fileType: { // 支持的文件类型
      type: Array,
      default: () => []
    },
    token: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      default: '请上传正确格式的文件'
    }
  },
  mounted () {
    this.headers.jtoken = this.token || Environment.TOKEN;
  },

  methods: {
    submitUpload () {
      if (!this.$refs.upload.uploadFiles.length) {
        this.$message.warning('请重新添加文件');
        return;
      }
      this.$refs.upload.submit();
    },
    exceed (file, fileList) {
      console.log('超出数量');
    },
    onChange (file, fileList) {
      file.status === 'ready' && (this.$emit('init')); // 初始化数据
      if (!this.getFileType(file.name)) {
        this.$notify.error({
          title: '错误',
          message: '请上传excel文件'
        });
        this.fileName = '';
        return false;
      }
      this.$refs.upload.uploadFiles = [file];
      this.fileName = file.name;
      this.disBtn = false;
    },
    // 上传前
    beforeUpload (file) {
      // 文件类型
      if (!this.getFileType(file.name)) {
        this.$notify.error({
          title: '错误',
          message: this.message
        });
        this.$refs.upload.clearFiles();
        this.fileName = '';
        return false;
      }
    },
    getFileType (names) {
      let name = (names.split('.').reverse()[0] || '').toLowerCase();
      let fileType = ['xlsx', 'xls'];
      fileType = [...fileType, this.fileType];
      return fileType.includes(name);
    },
    // 上传失败错误
    errors () {
      this.$notify.error({
        title: '错误',
        message: '文件上传失败。'
      });
    },
    //  上传成功
    success (response, file, fileList) {
      if (response.code === '5000') {
        this.$message.error(response.message);
      } else {
        let files = JSON.parse(response).data;
        this.$emit('upload', files);
      }
      // 方到下个队列中去清空
      setTimeout(() => {
        this.disBtn = true;
        this.$refs.upload.clearFiles();
      }, 0);
    }
  }
};
</script>
