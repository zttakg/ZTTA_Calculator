<template>
  <svg
    :width="width"
    :height="height"
    :viewBox="viewBox"
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    xmlns:xlink="http://www.w3.org/1999/xlink">
    <slot></slot>
  </svg>
</template>

<script>
export default {
  name: "SvgRoot",

  props: {
    width: {
      type: Number,
      default: 500
    },
    height: {
      type: Number,
      default: 500
    },
    viewBox: {
      type: String,
      default() {
        return `0 0 ${this.width} ${this.height}`;
      }
    }
  }
};
</script>
