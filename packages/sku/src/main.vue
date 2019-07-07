<template>
  <div class="yl-sku">
    <dl v-for="(item,key) in collection" :key="key" class="content">
      <dt> {{key}} : </dt>
      <dd>
        <button class="item" v-for="value in item" :key="value.name" @click="handleActive(key, value)" v-bind:class="{active: value.active, disabled: !value.active && value.disabled}"> {{ value.name }} </button>
      </dd>
    </dl>
    已经选择：{{ message }}
  </div>
</template>

<script>
export default {
  name: "YlSku",
  data() {
    return {
      sequenceMap:{},//格式化的数据(幂集)
      spliter: "\u2299", // 分隔符
      attrNames:[],//属性类别名称 ['颜色','尺寸','大小']
      selectSkuId:'',//选中的skuId
      simplifyData:[],//简化后的data [{path:'红⊙大⊙A',sku:'3158055'}]
      collection:{},//显示归集,用于展示使用
      // data: [
      //   { 颜色: "红", 尺码: "大", 型号: "A", skuId: "3158055" },
      //   { 颜色: "白", 尺码: "大", 型号: "A", skuId: "3158054" },
      //   { 颜色: "白", 尺码: "中", 型号: "B", skuId: "3133859" },
      //   { 颜色: "蓝", 尺码: "小", 型号: "C", skuId: "3516833" }
      // ],
      // 数据集合{list.result list.items}
      message: ""
    };
  },
  props:{
    data:{
      type: Array,
      required:true
    },
    skuName:{
      type:String,
      default:'skuId'
    },
    skuId:{
      type:[String,Number],
      default:''
    }
  },
  methods: {
    /**
     * 初始化数据
     * @return
     */
    initData() {
      this.sequenceMap = {}; 
      this.selectSkuId=this.skuId || this.data[0][this.skuName];//默认选中第一条
      this.attrNames = this.getAllAttrs(); //得到属性
      let {simplifyData,collection} = this.combineAttr(this.data, this.attrNames);//得到简化后的data数据,和归类
      this.collection=collection;
      this.simplifyData=simplifyData;
      this.selectSkuId && (this.initSeleted(this.selectSkuId)); //初始化选中
      this.buildResult(simplifyData); //生成所有子集
      this.updateStatus(this.getSelectedItem()); //获取选中信息,更新状态
      this.showResult();
    },
    /**
     * 获取所有属性
     * @return {[type]} [description]
     */
    getAllAttrs() {
      let arrKeys = [];
      for (let attribute in this.data[0]) {
        if (!this.data[0].hasOwnProperty(attribute)) {
          continue;
        }
        if (attribute !== this.skuName) {
          arrKeys.push(attribute);
        }
      }
      return arrKeys;
    },
    /**
     * 计算属性
     * @param  {[type]} data [description]
     * @param  {[type]} keys [description]
     * @return {[type]}      [description]
     */
    combineAttr(data, keys) {
      let allKeys = [];
      let result = {};
      for (let i = 0; i < data.length; i++) {
        let item = data[i];
        let values = [];
        for (let j = 0; j < keys.length; j++) {
          let key = keys[j];
          if (!result[key]) {
            result[key] = {};
          }
          if (!result[key][item[key]]) {
            result[key][item[key]] = {
              name: item[key],
              active: false,
              disabled: true
            };
          }
          values.push(item[key]);
        }
        allKeys.push({ //将数据格式化成简单数据
          path: values.join(this.spliter),
          sku: item["skuId"]
        });
        // {path: "红⊙大⊙A", sku: "3158055"}
      }
      return {
        collection: result,
        simplifyData: allKeys
      };
    },
    /**
     * 初始化选中
     * @param  mixed|Int|String skuId 需要选中的skuId
     * @return {[type]}       [description]
     */
    initSeleted(skuId) {
       for (const item of this.data) {
          if (item[this.skuName] === skuId) {
              Object.keys(item).forEach(subItem=>{
                if(subItem !== this.skuName){
                  collection[subItem][item[subItem]].active=true
                }
              })
          break;
          }
        }
    },
    /**
     * 生成所有子集是否可选、库存状态 map
     */
    buildResult(items) {
      let allKeys = this.getAttruites(items);

      for (let i = 0; i < allKeys.length; i++) {
        let curr = allKeys[i];
        let sku = items[i].sku;
        let values = curr.split(this.spliter);
        let allSets = this.powerset(values);

        // 每个组合的子集
        for (let j = 0; j < allSets.length; j++) {
          let set = allSets[j];
          let key = set.join(this.spliter);

          if (this.sequenceMap[key]) {
            this.sequenceMap[key].skus.push(sku);
          } else {
            this.sequenceMap[key] = {
              skus: [sku]
            };
          }
        }
      }
    },
    //幂集
    powerset(arr) {
      let ps = [[]];
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0, len = ps.length; j < len; j++) {
          ps.push(ps[j].concat(arr[i]));
        }
      }
      return ps;
    },

    getAttruites(arr) {
      let result = [];
      for (let i = 0; i < arr.length; i++) {
        result.push(arr[i].path);
      }

      return result;
    },
    /**
     * 获取选中的信息
     * @return Array
     */
    getSelectedItem() {
      let result = [];
      for (let attr in this.collection) {
        let attributeName = "";
        for (let attribute in this.collection[attr]) {
          if (this.collection[attr][attribute].active === true) {
            attributeName = attribute;
          }
        }
        result.push(attributeName);
      }
      return result;
    },
    /**
     * 更新所有属性状态
     */
    updateStatus(selected) {
      for (let i = 0; i < this.attrNames.length; i++) {
        let key = this.attrNames[i],
          data = this.collection[key],
          hasActive = !!selected[i],
          copy = selected.slice();

        for (let j in data) {
          let item = data[j]["name"];
          if (selected[i] == item) {
            continue;
          }

          copy[i] = item;
          let curr = this.trimSpliter(copy.join(this.spliter), this.spliter);
          this.collection[key][j]["disabled"] = this.sequenceMap[curr]
            ? false
            : true;
        }
      }
    },
    
			trimSpliter(str, spliter) {
			    // ⊙abc⊙ => abc
			    // ⊙a⊙⊙b⊙c⊙ => a⊙b⊙c
			    let reLeft    = new RegExp('^' + spliter + '+', 'g');
			    let reRight   = new RegExp(spliter + '+$', 'g');
			    let reSpliter = new RegExp(spliter + '+', 'g');
			    return str.replace(reLeft, '')
			        .replace(reRight, '')
			        .replace(reSpliter, spliter)
			},
    /**
     * 显示选中的信息
     * @return
     */
    showResult() {
      let result = this.getSelectedItem();
      let s = [];
      for (let i = 0; i < result.length; i++) {
        let item = result[i];
        if (!!item) {
          s.push(item);
        }
      }

      if (s.length == this.attrNames.length) {
        let curr = this.sequenceMap[s.join(this.spliter)];
        if (curr) {
          s = s.concat(curr.skus);
          this.selectSkuId = curr.skus[0];
        }

        this.message = s.join("\u3000-\u3000");
      }
    },
    /**
     * 点击事件处理
     * @param  key   点击的行
     * @param  value 点击的按钮的数据
     */
    handleActive: function(key, value) {
      if (value.active == true) {
        return false;
      }

      this.handleNormalClick(key, value);
      if (value.disabled === true) {
        this.handleDisableClick(key, value);
      }

      this.updateStatus(this.getSelectedItem());
      this.showResult();
    },
    /**
     * 正常属性点击
     * 同组其他置成activefalse
     */
    handleNormalClick(key, value) {
      for (let i in this.collection[key]) {
        if (i != value.name) {
          this.collection[key][i].active = false;
        } else {
          this.collection[key][i].active = true;
        }
      }
    },
    /**
     * 无效属性点击
     * 其他组全部置成activefalse
     */
    handleDisableClick(key, value) {
      this.collection[key][value.name]["disabled"] = false;
      // 清空高亮行的已选属性状态（因为更新的时候默认会跳过已选状态）
      for (let i in this.collection) {
        if (i != key) { 
          for (let x in this.collection[i]) {
            this.collection[i][x].active = false;
          }
        }
      }
      this.updateStatus(this.getSelectedItem());
    }
  },
  created() {
    this.initData();
  }
};
</script>
