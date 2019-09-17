<template>
  <div class="yl-status-tips">
    <div class="yl-status-tips__section" :class="[color]" :style="style">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'YlStatusTips',
  data () {
    return {
    };
  },
  props: {
    status: { // 状态
      type: String,
      default: 'success',
      validator: function (value) {
        return ['success', 'warning', 'danger', 'info', 'gray'].indexOf(value) !== -1;
      }
    },
    width: {
      type: String,
      default: '80px'
    },
    height: {
      type: String,
      default: '35px'
    },
    top: {
      type: String,
      default: '10px'
    },
    right: {
      type: String,
      default: '10px'
    }
  },
  computed: {
    color () {
      return `yl-status-tips__${this.status}`;
    },
    style () {
      return `width:${this.width};height:${this.height};top:${this.top};right:${this.right}`;
    }
  }
};
</script>
