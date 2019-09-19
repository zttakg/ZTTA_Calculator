<template>
  <rect
    :x="positionX"
    :y="positionY"
    :rx="radiusX"
    :ry="radiusY"
    :width="width"
    :height="height"
    :fill="fillColor"
    :stroke-width="stroke"
    :stroke="strokeColor"
  />
</template>

<script>
export default {
  name: "SvgRectangle",

  props: {
    width: {
      type: String,
      default: "300"
    },
    height: {
      type: String,
      default: "300"
    },
    rx: String,
    ry: String,
    x: {
      type: String,
      default: "0"
    },
    y: {
      type: String,
      default: "0"
    },
    radius: String,
    strokeWidth: {
      type: Number,
      default: 0
    },
    strokeColor: String,
    fillColor: String
  },

  computed: {
    radiusX() {
      const rx = this.rx && this.ry ? this.rx : this.radius;
      return rx > 0 ? rx : undefined;
    },
    radiusY() {
      const ry = this.ry && this.ry ? this.ry : this.radius;
      return ry > 0 ? ry : undefined;
    },
    positionX() {
      const x = this.x
        ? this.strokeWidth + parseInt(this.x, 10)
        : this.strokeWidth;
      return x > 0 ? x : undefined;
    },
    positionY() {
      const y = this.y
        ? this.strokeWidth + parseInt(this.y, 10)
        : this.strokeWidth;
      return y > 0 ? y : undefined;
    },
    stroke() {
      return parseInt(this.strokeWidth, 10) > 0 ? this.strokeWidth : undefined;
    }
  }
};
</script>
