<template>
  <div class="yl-table-tree">
    <el-table  v-bind="$attrs" :data="formatData" :expand-row-keys="expandRowKeys" :row-key="getRowKey" v-on="$listeners" style="width: 100%;margin-bottom: 20px;" border >
      <slot />
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'YlTableTree',
  data () {
    return {
      formatData: [],
      expandRowKeys: []
    };
  },
  props: {
    expandAll: { // 是否默认展开
      type: Boolean,
      default: false
    }, 
    node: { // 节点
      type: String,
      default: 'children'
    }
  },
  watch: {
    $attrs: {
      handler: function (val, oldVal) {
        let data = val.data;
        if (this.isArray(data)) {
          [this.formatData, this.expandRowKeys] = this.treeToArray(JSON.parse(JSON.stringify(data)));
        } else {
          return new Error('data必须是array');
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    isArray (o) { // 是否数组
      return Object.prototype.toString.call(o).slice(8, -1) === 'Array';
    },
    treeToArray (data, level = 0, expandRowKeys = []) {
      let arr = data.map((item, index) => {
        item._id = level + (index + 1) + '';
        if (this.expandAll) {
          expandRowKeys.push(item._id);
        }
        let node = this.node || 'children';
        item.children = item[node];
        if (item.children && item.children.length) {
          [item.children] = this.treeToArray(item.children, item._id, expandRowKeys);
        }
        return item;
      });
      return [arr, expandRowKeys];
    },
    getRowKey (row) {
      return row._id;
    }
  }
 
};
</script>
