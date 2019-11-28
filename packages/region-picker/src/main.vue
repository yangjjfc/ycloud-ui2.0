<template>
  <div class="yl-region-picker">
    <my-address :regions="chinaAddr" :province="province" v-bind="$attrs" :city="city" :district="district" @onchange="change" :classx="className" :disabled="disabled"></my-address>
  </div>
</template>

<script>
import myAddress from './address.vue';
import emitter from 'ycloud-ui/src/mixins/emitter';
import REGION_DATA from 'ycloud-ui/src/utils/china-map'; // 元数据的文案要改，只能把数据文件本地化
export default {
  name: 'YlRegionPicker',
  mixins: [emitter],
  data () {
    return {
      chinaAddr: REGION_DATA,
      province: '',
      city: '',
      district: '',
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
  created () {
    this.codes && this._initData(this.codes);
  },
  computed: {
    className () {
      return this.$attrs.twoSelect ? 'towCol' : 'threeCol';
    }
  },
  methods: {
    // 初始化数据
    _initData (val) {
      if (val) {
        let province = val.toString().slice(0, 2) + '0000', city = '', district = '';
        if (this.$attrs.twoSelect) {
          city = val.toString();
        } else {
          district = val.toString();
          city = district.slice(0, 4) + '00';
          this.district = this.chinaAddr[city][district] || '';
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
      if (this.$attrs.twoSelect) { // 2级联动
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
