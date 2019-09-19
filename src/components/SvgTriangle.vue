<template>
  <SvgPolygon :points="points" :fillColor="fillColor" />
</template>

<script>
import { SvgPolygon } from "@/components";

export default {
  name: "SvgTriangle",

  components: {
    SvgPolygon
  },

  props: {
    side1: {
      type: String,
      default: "300"
    },
    side2: {
      type: String,
      default: "300"
    },
    fillColor: String
  },

  computed: {
    points() {
      return `0,0 0,${this.side1} ${this.side2},${this.side1} 0,0`;
    }
  }
};
</script>
