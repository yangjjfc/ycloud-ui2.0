<template>
    <svg class="yl-svg" aria-hidden="true">
        <use :xlink:href="iconName"></use>
    </svg>
</template>

<script>
export default {
  name: 'YlSvg',
  props: {
    icon: {
      type: String,
      required: false
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconName () {
      return `#${this.icon}`;
    },
    svgClass () {
      if (this.className) {
        return 'yl-svg ' + this.className;
      } else {
        return 'yl-svg icon';
      }
    }
  }
};
</script>
