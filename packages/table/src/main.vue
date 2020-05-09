<script>
import sectting from './sectting';
import indexDB from './indexDB.js';
import { Environment } from 'ycloud-ui/src/config/index';
import SHA256 from 'ycloud-ui/src/utils/sha256/sha256.min.js';

export default {
  name: 'ylTable',
  mixins: [indexDB],
  data () {
    return {
      config: [],
      sourceConfig: [],
      sourceSlots: [], // 原始solt数据
      sSolts: [], // 展示solt数据
      isTableSet: false, // 设置
      showTable: true,
      storeConfig: {},
      isFristLoad: true
    };
  },
  props: {
    data: {
      // 显示数据
      type: Array,
      required: true
    },
    showConfig: {
      type: Boolean,
      default: true
    },
    name: {
      type: String,
      default: ''
    },
    setName: {
      // 设置名称
      type: String
    },
    // 依赖数据
    depend: {
      type: [Array, Boolean, String, Object]
    },
    // 是否可以修改列名称
    isEditName: {
      type: Boolean,
      default: false
    }
  },
  created () {
    this.init();
  },
  watch: {
    depend: {
      deep: true,
      handler (val, current) {
        if (val !== current) {
          this.refresh();
        }
      }
    }
  },
  render (createElement, context) {
    let list = this.data;
    const listeners = {
      on: {
        ...this.$listeners
      }
    };
    return (
      <div class="yl-table">
      {this.showTable ? (
        <el-table data={list} stripe style="width: 100%" border size="small" ref="my-table" {...{ attrs: this.$attrs }} {...listeners} >
        {this.sSolts}
        </el-table>
      ) : null}
      {this.isTableSet ? (
        <sectting isShow={true} {...{ on: { 'update:isShow': e => { this.isTableSet = e; } } }} columns={this.config} 
          isEditName={this.isEditName} sourceColumns={this.sourceConfig} onChange={this.changeTableColumns} />
      ) : null}
      </div>
    );
  },
  methods: {
    // 刷新视图
    refresh () {
      this.$nextTick(() => {
        this.init();
      });
    },
    // 初始化
    init () {
      this.sourceSlots = this.$slots.default.filter(item => item.tag);
      this.formatProps().then(_ => {
        if (this.showConfig) {
          let arr = [];
          if (this.setName) {
            arr = this.sourceSlots.filter(
              item => item.componentOptions.propsData.prop === this.setName
            );
          } else {
            arr = this.sourceSlots.filter(item => {
              let prop = item.componentOptions.propsData.prop || item.componentOptions.propsData.type;
              return prop === 'index' || prop === 'indexX';
            });
          }
          if (arr && arr.length) {
            if (!arr[0].data.scopedSlots) {
              arr[0].data.scopedSlots = {};
            }
            arr[0].data.scopedSlots.header = () => (
              <i class="el-icon-s-tools pointer"
                onClick={() => {
                  this.isTableSet = true;
                }}
              />
            );
          }
        }
        this.columnCof();
      });
    },
    // 处理props和attrs
    formatProps () {
      return new Promise(resolve => {
        let arr = [];
        for (const item of this.sourceSlots) {
          arr.push({
            ...item.componentOptions.propsData,
            ...item.data.attrs
          });
        }
        this.config = arr;
        this.sourceConfig = JSON.parse(JSON.stringify(arr));
        this.generateHash();
        // 是否拿过配置信息
        if (this.isFristLoad) {
          this.isFristLoad = false;
          // 判断类型
          if (Environment.TABLE.mode === 'http') {
            this.getPageConfig().then(_ => {
              resolve();
            });
          } else {
            this.initIndexDB().then(_ => {
              resolve();
            });
          }
        } else {
          this.getConfig(this.storeConfig);
          resolve();
        }
      });
    },
    // 配置
    columnCof () {
      let arr = [];
      for (const item of this.config) {
        for (const subItem of this.sourceSlots) {
          // isHide为true则隐藏
          let isShow = (item.prop && item.prop === subItem.componentOptions.propsData.prop) ||
                        (item.type && item.type === subItem.componentOptions.propsData.type);
          if (isShow && !item.isHide) {
            subItem.componentOptions.propsData = item;
            arr.push(subItem);
            break;
          }
        }
      }
      this.showTable = false;
      this.sSolts = arr;
      // hack
      this.$nextTick(() => {
        this.showTable = true;
      });
    },
    // 列修改
    changeTableColumns (a) {
      this.showTable = false;
      this.config = a;
      this.columnCof();
      // hack
      this.$nextTick(() => {
        this.showTable = true;
      });
      this.setConfig();
    },
    // 得到页面的key
    generateHash () {
      let path = window.location.pathname.split('/').slice(1);
      if (this.name) {
        path.push(this.name);
      }
      path = path.join('.');
      // TODO 取值需要修改
      let userInfo = Environment.USERINFO;
      this.hash = SHA256(JSON.stringify(this.sourceConfig.filter(item => !item.unSet)));
      this.pageKey = `${path}_${userInfo.userNo}`;
    },
    // 获取配置
    getConfig (configDB) {
      if (configDB.hash === this.hash) {
        this.config = configDB.config;
      }
    },
    // 获取table配置
    getPageConfig () {
      if (Object.prototype.toString.call(Environment.TABLE.get).slice(8, -1) === 'Function') {
        return Environment.TABLE.get.call(this, this.pageKey).then(res => {
          if (res) {
            this.storeConfig = res;
            this.getConfig(res);
          }
        });
      } else {
        this.$message.error('远程请求时Environment.TABLE.get必须是个函数');
        return Promise.reject();
      }
    },
    // 保存配置
    setConfig () {
      let obj = {
        id: this.pageKey,
        hash: this.hash,
        config: this.config
      };
      if (Environment.TABLE.mode === 'http') {
        if (Object.prototype.toString.call(Environment.TABLE.save).slice(8, -1) === 'Function') {
          Environment.TABLE.save.call(this, this.pageKey, obj);
        } else {
          this.$message.error('远程请求时Environment.TABLE.savet必须是个函数');
        }
      } else if (this.isGetData) {
        this.updateDataDB(obj);
      } else {
        this.addDataDB(obj);
      }
    },
    // 添加table自带方法
    ...(() => {
      let methodKeys = ['clearSelection', 'toggleRowSelection', 'toggleAllSelection', 'setCurrentRow', 'clearSort', 'clearFilter', 'doLayout', 'sort'],
        methods = [], methodsJson = {};
      methodKeys.forEach(key => {
        methods.push({ [key] (...res) {
          this.$refs['my-table'][key].apply(this, res);
        } });
      });
      methods.forEach(item => {
        methodsJson = { ...methodsJson, ...item };
      });
      return methodsJson;
    })()
  },
  components: {
    sectting
  }
};
</script>
