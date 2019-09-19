
<template>
  <line
    :x1="x1"
    :y1="y1"
    :x2="x2"
    :y2="y2"
    :stroke-linecap="strokeLinecap"
    :stroke-width="strokeWidth"
    :stroke="strokeColor"
  />
</template>

<script>
export default {
  name: "SvgLine",

  props: {
    from: {
      type: Array,
      default() {
        return [20, 120];
      }
    },
    to: {
      type: Array,
      default() {
        return [120, 20];
      }
    },
    strokeWidth: {
      type: Number,
      default: 1
    },
    strokeLinecap: {
      type: String,
      default: "round"
    },
    strokeColor: {
      type: String,
      default: "#000"
    }
  },

  computed: {
    x1() {
      return this.from[0];
    },
    y1() {
      return this.from[1];
    },
    x2() {
      return this.to[0];
    },
    y2() {
      return this.to[1];
    }
  }
};
</script>
