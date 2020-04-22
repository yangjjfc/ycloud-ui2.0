<template>
  <div class="yl-multi-select-page">
    <div class="yl-multi-select-page-left">
      <slot name="left"></slot>
    </div>
    <div class="yl-multi-select-page-right">
      <el-card class="box-card">
        <el-badge :value="checkAll.length" :max="99" class="item">
          <h3>{{title}}</h3>
        </el-badge>
        <el-scrollbar class="box-card-scroll" :style="mStyle">
          <template v-for="item in checkAll">
            <div :key="item[id]" class="box-card-li">
              <el-tag closable effect="dark" class="mgr10" @close="handleDel(item)">{{item[value]}}</el-tag>
            </div>
          </template>
        </el-scrollbar>
      </el-card>
    </div>
  </div>
</template>

<script>
function broadcast (componentName, eventName, params) {
  this.$children.forEach(child => {
    var name = child.$options.componentName || child.$options.name;
    if (name === componentName) {
      child[eventName](params);
    } else {
      broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}
export default {
  name: 'YlMultiSelectPage',
  data () {
    return {
      mStyle: '',
      otherRows: [], // 其他
      checkCurrent: [], // 当前页面的选中
      checkAll: [] // 全部选中
    };
  },
  mounted () {
    this.mStyle = `height:${this.height}px`;
  },
  props: {
    title: {// 名称
      type: String,
      required: true
    },
    id: { // 匹配的关键id
      type: String,
      required: true
    },
    value: { // 显示名称
      type: String,
      required: true
    },
    height: { // 右侧高度
      type: String,
      default: '400'
    },
    list: { // 获取列表数据
      type: Array,
      required: true
    },
    oList: { // 默认选中
      type: Array,
      default: () => []
    },
    checked: { // 当前选中
      type: Array,
      default: () => []
    }

  },
  watch: {
    list: {
      handler: function (val, oldVal) {
        this.getIntersection(val, this.checkAll);
      },
      immediate: true
    },
    oList: {
      handler: function (val, oldVal) {
        this.checkAll = this.oList;
      },
      immediate: true
    },
    checked: {
      handler: function (val, oldVal) {
        this.handleSelectionChange(val);
      }
    }
  },
  methods: {
    // 获取数组交集
    getIntersection (list, checkAll) {
      this.otherRows = [];
      let checked = checkAll.map(item => item[this.id]); // 获取编号
      let checkCurrent = list.reduce((arr, item, index) => {
        if (checked.includes(item[this.id])) {
          arr.push(item);
        }
        return arr;
      }, []);
      checkCurrent = checkCurrent || [];
      let checkCurrented = checkCurrent.map(item => item[this.id]); // 获取编号
      this.otherRows = checkAll.filter(item => !checkCurrented.includes(item[this.id]));
      this.$nextTick(_ => { // 更新
        checkCurrent.forEach(element => {
          broadcast.call(this, 'ElTable', 'toggleRowSelection', element);
        });
      });
    },
    // 选折
    handleSelectionChange (row) {
      this.checkCurrent = [...row];
      this.arrMerge();
    },
    // 合并
    arrMerge () {
      let checkAll = Array.from(new Set([...this.checkCurrent, ...this.otherRows]));
      this.checkAll = checkAll;
      this.update();
    },
    // 删
    handleDel (row) {
      let checkAll = this.checkAll.filter(item => item[this.id] !== row[this.id]);
      let checkCurrent = this.checkCurrent.filter(item => item[this.id] === row[this.id]);
      this.otherRows = this.otherRows.filter(item => item[this.id] !== row[this.id]);
      if (checkCurrent.length) {
        broadcast.call(this, 'ElTable', 'toggleRowSelection', row);
      }
      this.checkAll = checkAll;
      this.update();
    },
    // 更新
    update () {
      this.$emit('update', this.checkAll);
    }
  }
};
</script>
