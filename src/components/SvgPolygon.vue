<template>
  <polygon
    :points="points"
    :x="strokeWidth"
    :y="strokeWidth"
    :fill="fillColor"
    :stroke-width="strokeWidth"
    :stroke="strokeColor"
  />
</template>

<script>
export default {
  name: "SvgPolygon",

  props: {
    points: String,
    strokeWidth: Number,
    strokeColor: String,
    fillColor: String
  }
};
</script>
