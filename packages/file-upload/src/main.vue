<template>
  <div class="yl-file-upload" ref="imgUpload">
    <el-upload v-bind="$attrs" v-on="$listeners" :disabled="disabled" :action="action" :headers="headers" :list-type="listType" :on-success="success" :on-error="errors" :before-upload="beforeUpload" :drag="drag" :on-remove="remove" :file-list="fileLists" :on-exceed="handleExceed" :limit="limit" ref="ylUpload">
      <slot name='imgs'></slot>
      <i class="el-icon-plus"></i>
      <div slot="file" slot-scope="{file}" class="yl-file-img" v-if="listType === 'picture-card'">
        <el-progress type="circle" v-if="file.status==='uploading'" :percentage="parsePercentage(file.percentage)" :width="80"></el-progress>
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview" @click="review(file)" v-show="showPreview(file)">
            <i class="el-icon-zoom-in"></i>
          </span>
          <span class="el-upload-list__item-delete" @click="handleDownload(file)" v-if="showDown">
            <i class="el-icon-download"></i>
          </span>
          <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </div>
    </el-upload>
    <div v-show="false" ref="boxer">
      <a v-for="item in files" :href="item.fullUrl" :key="item.fullUrl" v-boxer="item.fullUrl" :class="'link-view-'+item.uid"></a>
    </div>
  </div>
</template>

<script>
import Emitter from 'ycloud-ui/src/mixins/emitter';
import boxer from 'ycloud-ui/src/directives/boxer';
import { getFileType, formatFile, downloadFile } from 'ycloud-ui/src/utils/global';
import { Environment } from 'ycloud-ui/src/config/index';
export default {
  name: 'YlFileUpload',
  mixins: [Emitter],
  data () {
    return {
      headers: {}, // 添加请求头{}
      fileLists: [], // 默认已上传 文件地址[{name,url}]
      files: [], // 放大图片的集合
      isChange: false, // 是否有变更
      imgUrls: []// 原地址
    };
  },
  directives: {
    boxer
  },
  props: {
    action: {
      type: String,
      default: '/gateway/upload' // 云医购
    },
    listType: {
      type: String,
      default: 'picture-card'
    },
    limit: { // 最大上传数量
      type: [Number, String],
      default () {
        return 5;
      }
    },
    supportType: {
      type: String,
      default: 'all',
      validator: function (value) {
        return ['img', 'file', 'all'].indexOf(value) !== -1;
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    drag: {
      type: Boolean,
      default: false
    },
    value: { // 图片地址
      type: [String, Array],
      required: true
    },
    hideUploadBtn: {
      type: Boolean,
      default: false
    },
    validateEvent: {
      type: Boolean,
      default: true
    },
    string: {
      type: Boolean,
      default: true
    },
    join: {
      type: String,
      default: ';'
    },
    token: {
      type: String,
      default: ''
    },
    showDown: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    this.headers.jtoken = this.token || Environment.TOKEN;
    this.initFiles(this.value);
  },
  watch: {
    value: {
      deep: true,
      handler: function (val, oldVal) {
        val && !this.isChange && this.initFiles(val);
      }
    }
  },
  methods: {
    // 强制更新
    fourceUpdate () {
      this.initFiles(this.value);
    },
    // 初始化file
    initFiles (val) {
      if (!val) return;
      let splitCode = val.includes(',') ? ',' : val.includes(';') ? ';' : null;
      let src = (typeof val === 'string' ? val.split(splitCode) : (val instanceof Array ? val : null)),
        list = [],
        reUrls = []; // 全地址
      this.imgUrls = [];
      src && src.forEach(item => {
        if (item) {
          let formatUrl = this.formatFile(item);
          list.push(formatUrl);
          reUrls.push(formatUrl.reUrl); // 全地址
        }
      });
      this.imgUrls = reUrls; // 原地址
      this.files = this.fileLists = [...list];
      this.updateUploadBtn();
    },
    // 格式化文件
    formatFile (item, uid) {
      let thumbnail = formatFile(item);
      return {
        uid: (uid || parseInt(Math.random() * 1000000000)),
        url: thumbnail, // 缩略图地址
        fullUrl: Environment.IMAGE_DOWNLOAD + item, // TODO 需修改
        reUrl: item // 原地址
      };
    },
    // 更新上传按钮是否显示
    updateUploadBtn () {
      let $card = this.$refs.imgUpload.querySelector('.el-upload'),
        $icon = this.$refs.imgUpload.querySelector('.el-icon-plus');
      if (this.hideUploadBtn || this.disabled) {
        $card.style.display = 'none';
        $icon.style.display = 'none';
        return;
      }
      let _flag = this.imgUrls.length >= this.limit; // 默认5条
      $card.style.display = _flag ? 'none' : 'inline-block';
      $icon.style.display = _flag ? 'none' : 'inline-block';
    },
    // 上传前
    beforeUpload (file) {
      if (!this.headers.jtoken) {
        this.$notify.error({
          title: '错误',
          message: '文件服务器有误,暂时无法上传'
        });
      }
      // 文件类型
      if (!getFileType(file.name, this.supportType)) {
        this.$notify.error({
          title: '错误',
          message: '暂不支持上传文件 ' + file.type + ' 格式。'
        });
        return false;
      }
      // 文件大小不能超过5M
      if (file.size > Environment.IMG_SIZE_MAX) {
        this.$notify.error({
          title: '错误',
          message: `文件大小不能超过 ${parseInt(Environment.IMG_SIZE_MAX) / 1024 / 1024}MB。`
        });
        return false;
      }
      this.isChange = true;
      if (this.fileLists.length === this.limit - 1) { // why
        this.$refs.imgUpload.querySelector('.el-upload').style.display = 'none';
        this.$refs.imgUpload.querySelector('.el-icon-plus').style.display = 'none';
      }
    },
    // 上传失败错误
    errors () {
      this.$notify.error({
        title: '错误',
        message: '文件上传失败。'
      });
      this.updateUploadBtn();
    },
    // 上传成功
    success (response, file, fileList) {
      let res;
      if (typeof response === 'string') {
        res = JSON.parse(response);
      } else {
        res = response;
      }
      // pdf 不能预览，需要替换
      if (!/^image/g.test(file.raw.type)) {
        let formatUrl = this.formatFile(file.name);
        file.url = formatUrl.url;
      }
      if (res.code.toUpperCase() === 'SUCCESS') {
        let isAllSuccess = fileList.every(item => item.status === 'success');
        if (isAllSuccess) {
          this.updateFiles(fileList);
        }
      } else {
        this.handleRemove(file);
        this.$notify.error({
          title: '错误',
          message: res.message
        });
      }
    },
    // 更新图片
    updateFiles (list) {
      this.imgUrls = list.map(item => this.getFileUrl(item));
      this.files = list.map(item => ({
        uid: item.uid,
        fullUrl: Environment.IMAGE_DOWNLOAD + this.getFileUrl(item)
      }));
      let imgUrls = this.string ? this.imgUrls.join(this.join) : this.imgUrls;
      this.$emit('input', imgUrls);
      this.$emit('success', this.imgUrls, list);// 上传完成钩子
      if (this.validateEvent) {
        this.dispatch('ElFormItem', 'el.form.change', [this.imgUrls + '']);
      }
      this.updateUploadBtn();
    },
    getFileUrl (file) {
      // console.log(file);
      if (file.reUrl) {
        return file.reUrl;
      } else {
        try {
          return JSON.parse(file.response).data;
        } catch (e) {
          console.log('error', file);
          return '';
        }
      }
    },
    handleRemove (file) {
      let upload = this.$refs.ylUpload;
      upload.handleRemove(file);
    },
    // 删除
    remove (file, fileList) {
      this.updateFiles(fileList);
    },
    // 下载
    handleDownload (file) {
      let fileUrl = this.getFileUrl(file);
      fileUrl && downloadFile(Environment.IMAGE_DOWNLOAD + fileUrl);
      // console.log(file);
    },
    // 点击放大镜查看
    review (file) {
      let fileUrl = this.getFileUrl(file),
        fileType = getFileType(fileUrl);
      if (['image', 'pdf'].includes(fileType)) {
        this.$refs.boxer.querySelector(`.link-view-${file.uid}`).click();
      } else {
        window.open('http://view.officeapps.live.com/op/view.aspx?src=' + Environment.IMAGE_DOWNLOAD + fileUrl);
      }
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 ${this.limit}个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    // 进度条
    parsePercentage (size) {
      try {
        return parseInt(size);
      } catch (error) {
        console.log('进度条失败: ', error);
      }
    },
    // 是否能查看
    showPreview (file) {
      let format = ['image', 'jpg', 'jpeg', 'png', 'pic', 'bmp', 'gif', 'doc', 'docx', 'xls', 'xlsx', 'pdf'];
      if (file.fullUrl) {
        let fSuffix = file.fullUrl.split('.').reverse()[0];
        return format.includes(fSuffix);
      }
      return false;
    }
  }
};
</script>
