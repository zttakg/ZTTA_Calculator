<template>
  <path
    :d="path"
    :stroke-linecap="strokeLinecap"
    :stroke-width="strokeWidth"
    :stroke="strokeColor"
    :fill="fillColor"
  />
</template>

<script>
export default {
  name: "SvgPath",

  props: {
    path: {
      type: String,
      default: "M 100 300 L 150 350 L 100 400 L 50 350 L 100 300"
    },
    strokeWidth: Number,
    strokeLinecap: String,
    strokeColor: String,
    fillColor: String
  }
};
</script>
