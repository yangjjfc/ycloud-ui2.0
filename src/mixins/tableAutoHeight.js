/**
 * table 高度自动计算
 * table ref必须是'my-table',
 * 使用mixin后 加table属性 :max-height="tableHeight"
 */
import { debounce } from 'lodash';
export default {
  data () {
    return {
      tableContainer: 'document',
      tableHeight: 0,
      tablelimitHeight: 0
    };
  },
  methods: {
    countTableHeight () {
      let $table = this.$refs['my-table'].$el;
      let clientTop = $table && $table.getBoundingClientRect().top;
      let offsetTop = $table && $table.offsetTop;
      let limitH = this.tablelimitHeight + 100;
      let elHeight = null;
      switch (this.tableContainer) {
        case 'document':
          elHeight = window.innerHeight - clientTop - limitH;
          this.$nextTick(() => {
            this.tableHeight = elHeight;
          });
          break;
        case 'dialog':
          let $dialogHeader = document.querySelector('.el-dialog__header');
          let $dialogbody = document.querySelector('.el-dialog__body');
          let bodyHeight = parseInt(
            window
              .getComputedStyle($dialogbody, null)
              .getPropertyValue('max-height')
          );
          elHeight =
                  bodyHeight - (offsetTop - $dialogHeader.clientHeight) - limitH;
          this.$nextTick(() => {
            this.tableHeight = elHeight;
          });
          break;
        default:
          break;
      }
    }
  },
  mounted() {
    if (this.$refs['my-table']) {
      this.countTableHeight();
      const debounceFunc = debounce(this.countTableHeight.bind(this), 500);
      window.addEventListener('resize', debounceFunc);
      this.$once('hook:beforeDestroy', () => {
        window.removeEventListener('resize', debounceFunc);
      });
    }
  }
};
