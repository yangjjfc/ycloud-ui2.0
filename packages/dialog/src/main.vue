<template>
  <div class="yl-dialog">
    <el-dialog v-bind="$attrs" v-on="$listeners" :visible="show" :close-on-click-modal="closeOnClickModal" :before-close="cancel">
      <slot name='content'></slot>
      <span slot="footer" class="dialog-footer">
        <slot name="footer"></slot>
        <el-button type="primary" @click="submit" v-if="!hideSubmitButton" size="small" :disabled="disabledConfirmButton">{{this.confirmButtonText}}</el-button>
        <el-button @click="cancel" size="small" v-if="!hideCancelButton">{{closeButtonText}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'YlDialog',
  props: {
    show: { // 是否显示dailog
      type: Boolean,
      required: true,
      default: false
    },
    closeOnClickModal: { // 禁用某些操作,可配置
      type: Boolean,
      default: false
    },
    confirmButtonText: {
      type: String,
      default: '确定'
    },
    closeButtonText: {
      type: String,
      default: '关闭'
    },
    disabledConfirmButton: {
      type: Boolean,
      default: false
    },
    hideSubmitButton: {
      type: Boolean,
      default: false
    },
    hideCancelButton: {
      type: Boolean,
      default: false
    }//隐藏按钮
  },
  methods: {
    // 确认事件
    submit() {
      this.$emit('submit');
    },
    // 取消事件
    cancel() {
      this.$emit('update:show', false); // 更新父组件show
      this.$emit('reset');
    }
  }
};
</script>
