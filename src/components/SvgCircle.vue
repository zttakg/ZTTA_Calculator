<template>
  <circle
    :cx="centerX"
    :cy="centerY"
    :r="radius"
    :fill="fillColor"
    :stroke-width="strokeWidth"
    :stroke="strokeColor"
  />
</template>

<script>
export default {
  name: "SvgCircle",

  props: {
    diameter: {
      type: String,
      default: "300"
    },
    cx: String,
    cy: String,
    strokeWidth: Number,
    strokeColor: String,
    fillColor: String
  },

  computed: {
    radius() {
      return parseInt(this.diameter, 10) / 2;
    },
    centerX() {
      return this.getCenter(this.cx);
    },
    centerY() {
      return this.getCenter(this.cy);
    }
  },

  methods: {
    getCenter(coordinate) {
      const result = coordinate
        ? parseInt(this.radius, 10) + parseInt(coordinate, 10)
        : this.radius;

      if (this.strokeWidth) {
        return result + parseInt(this.strokeWidth, 10);
      }

      return result;
    }
  }
};
</script>
