<template>
  <div class="yl-pagination">
    <el-pagination v-bind="$attrs" v-on="listeners" :layout="layout" @size-change="changeSize" @current-change="changePage">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'YlPagination',
  data() {
    return {
      isChangeSizeEvent: false// 标记,避免重复更新
    }
  },
  props: {
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    }
  },
  created() {
    let whiteList = ['change', 'update:currentPage', 'update:pageSize'], //重置了的相关事件排除
      listeners = {};
    Object.keys(this.$listeners).filter(item => {
      if (!whiteList.includes(item)) {
        listeners[item] = this.$listeners[item]
      }
    })
    this.listeners = listeners
  },
  methods: {
    // 改变页码
    changePage(page) {
      this.$listeners
      if (this.isChangeSizeEvent) {
        this.isChangeSizeEvent = false;
        return;
      }
      this.$emit('change', page, this.$attrs['page-size']);
    },
    // 改变总条数
    changeSize(size) {
      if (Number(this.$attrs['total']) / size < this.$attrs['current-page']) {
        this.isChangeSizeEvent = true;// 阻止changePage触发
      }
      this.$emit('update:current-page', 1);
      this.$emit('change', 1, size);
    }
  }
};
</script>
