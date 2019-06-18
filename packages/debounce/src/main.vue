<script>
// 抖动函数
const debounce = (func, delay, before) => {
  let timer = null;
  delay = delay || 300;
  return (arg) => {
    if (timer) {
      window.clearTimeout(timer);
    }
    before && before.call(this);
    timer = window.setTimeout(() => {
      if (!Array.isArray(func)) {
        func = [func];
      }
      for (let i in func) {
        func[i].call(this, arg);
      }
      timer = null;
    }, delay);
  };
};

const isRegExp = (val) => Object.prototype.toString.call(val) === '[object RegExp]';

const match = (pattern, name) => {
  if (Array.isArray(pattern)) return pattern.includes(name);
  if (typeof pattern === 'string') return new Set(pattern.split(',')).has(name);
  if (isRegExp(pattern)) return pattern.test(name);
  return false;
};

// 更新props重新计算下
const pruneDebounce = (vm, filter) => {
  const { debounceMap, originMap, __vnode } = vm;
  Object.keys(debounceMap).filter(!filter).forEach((each) => {
    Reflect.deleteProperty(debounceMap, each);
    Reflect.set(__vnode.data.on, each, originMap[each]);
  });
};

export default {
  name: 'YlDebounce',
  abstract: true,
  props: {
    include: [Array, String, RegExp], // 方法名称
    exclude: [Array, String, RegExp],
    time: [String, Number],
    before: Function
  },
  created () {
    this.originMap = new Map(); 
    this.debounceMap = new Map();
    this.default = new Set();
    this.__vnode = null;
  },
  mounted () {
    this.$watch('include', val => { // 监听include参数变化，实时更新防抖函数
      pruneDebounce(this, name => match(val, name));
    });
    this.$watch('exclude', val => {
      pruneDebounce(this, name => !match(val, name));
    });
  },
  destroyed () {
    this.originMap = new Map();
    this.debounceMap = new Map();
    this.default = new Set();
    this.__vnode = null;
  },
  render () {
    const vnode = this.$slots.default[0] || Object.create(null);
    console.log(this.$slots.default);
    this.__vnode = vnode;
    if (vnode.tag === 'input') {
      this.default.add('input');
    } else if (vnode.tag === 'button') {
      this.default.add('click');
    }
    const { include, exclude, time } = this;
    console.log(vnode.$listeners);
    debugger;

    const evts = Object.keys(vnode.data.on); // 传入的方法
    const timer = parseInt(time);
    evts.forEach((each) => {
      if (
        (include && match(include, each)) ||
        (exclude && !match(exclude, each)) ||
        (!match(exclude, each) && this.default.has(each)) //
      ) {
        this.originMap.set(each, vnode.data.on[each]); // 原函数塞入originMap
        this.debounceMap.set(each, debounce.call(vnode, vnode.data.on[each], timer, this.before)); // 加入debounceMap中
        vnode.data.on[each] = this.debounceMap.get(each); // 重置函数
      }
    });
    return vnode;
  }
};
</script>
