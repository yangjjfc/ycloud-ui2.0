<template>
  <svg :class="svgClass" aria-hidden="true">
        <use :xlink:href="iconName"></use>
    </svg>
</template>

<script>
export default {
  name: 'YlIcon',
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
        return 'yl-icon ' + this.className;
      } else {
        return 'yl-icon';
      }
    }
  }
};
</script>
