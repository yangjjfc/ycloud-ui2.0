<template>
  <div class="yl-region-picker">
    <my-address
      v-if="isLoadinged"
      :regions="chinaAddr"
      :province="province"
      v-bind="$attrs"
      :city="city"
      :district="district"
      @onchange="change"
      :classx="className"
      :disabled="disabled"
    ></my-address>
  </div>
</template>

<script>
import myAddress from './address.vue';
import emitter from 'ycloud-ui/src/mixins/emitter';
import loadAreaData from './loadAreaData.js';

export default {
  name: 'YlRegionPicker',
  mixins: [emitter],
  data () {
    return {
      chinaAddr: '',
      province: '',
      city: '',
      district: '',
      isLoadinged: false,
      selectedData: null
    };
  },
  props: {
    // 省市区编码
    codes: {
      type: [String, Number],
      default: ''
    },
    validate: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    codes (val) {
      this._initData(val);
    }
  },
  mounted () {
    try {
      loadAreaData.init().then(source => {
        let res = this.format(source);
        this.chinaAddr = res;
        this.codes && this._initData(this.codes);
        this.isLoadinged = true;
      });
    } catch (err) {
      console.log(err);
    }
  },
  computed: {
    className () {
      return this.$attrs.twoSelect ? 'towCol' : 'threeCol';
    }
  },
  methods: {
    format (data) {
      let res = {};
      for (let key in data) {
        let keyPlus;
        if (key === '86') {
          keyPlus = 86;
        } else {
          keyPlus = key.toString() + '0000';
          keyPlus = keyPlus.slice(0, 6);
        }
        let sonObj = {};
        for (let key2 in data[key]) {
          let keyPlus2;
          keyPlus2 = key2.toString() + '0000';
          keyPlus2 = keyPlus2.slice(0, 6);
          sonObj[keyPlus2] = data[key][key2].name;
        }
        res[keyPlus] = sonObj;
      }
      return res;
    },
    // 初始化数据
    _initData (val) {
      if (val) {
        let province = val.toString().slice(0, 2) + '0000',
          city = '',
          district = '';
        if (this.$attrs.twoSelect) {
          city = val.toString();
        } else {
          district = val.toString();
          city = district.slice(0, 4) + '00';
          if (this.chinaAddr[city]) {
            this.district = this.chinaAddr[city][district] || '';
          } else {
            this.district = '市辖区';
          }
        }
        this.province = this.chinaAddr[86][province];
        this.city = this.chinaAddr[province][city] || '';
        this.selectedData = {
          provinceName: this.province,
          provinceCode: province,
          cityName: this.city,
          cityCode: city,
          townName: this.district,
          townCode: district
        };
      } else {
        this.province = '';
        this.city = '';
        this.district = '';
      }
    },
    change (msg) {
      let names = '';
      let vals = '';

      if (this.$attrs.twoSelect) {
        // 2级联动
        names = [msg.provinceName, msg.cityName].join('');
        vals = msg.cityCode;
      } else {
        names = [msg.provinceName, msg.cityName, msg.townName].join('');
        vals = msg.townCode;
      }
      this.selectedData = msg;
      this.$emit('input', names);
      this.$emit('update:codes', vals);
      this.$emit('change', this.selectedData);
      if (this.validate) {
        this.dispatch('ElFormItem', 'el.form.change', names);
      }
    },
    getSelectedData () {
      return this.selectedData;
    }
  },
  components: {
    myAddress
  }
};
</script>
