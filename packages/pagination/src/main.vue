<template>
  <div class="yl-pagination">
     <el-pagination  v-bind="$attrs" 
                    :page-size="currentSize" 
                    @size-change="changeSize" 
                    :current-page="currentIndex" 
                    @current-change="changePage"
                    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'YlPagination',
  data(){
    return {
        isChangeSizeEvent: false// 标记,避免重复更新
    }
  },
   props: {

   },
   computed: {
        currentIndex: {
            get () {
                return Number(this.pageIndex);
            },
            set (page) {
                this.$emit('update:pageIndex', page);
            }
        },
        currentSize: {
            get () {
                return Number(this.pageSize);
            },
            set (size) {
                this.$emit('update:pageSize', size);
            }
        }
    },
    methods: {      
        // 改变页码
        changePage (page) {
            if (this.isChangeSizeEvent) {
                this.isChangeSizeEvent = false;
                return; 
            }
            //this.currentIndex = page;
            this.$emit('change', page, this.size);
        },
        // 改变总条数
        changeSize (size) {
            if (Number(this.total) / size < this.currentIndex) {
                this.isChangeSizeEvent = true;// 阻止changePage触发
            }
            //this.currentSize = size;
            this.$emit('change', 1, size);
        }
    }
};
</script>
