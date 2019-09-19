<template>
  <SvgRoot :width="width" :height="height" :viewBox="`0 0 ${width} ${height}`">
    <Shape transform="translate(1, 1)" />
    <Dimensions />
  </SvgRoot>
</template>

<script>
import { mapGetters } from "vuex";
import { SvgRoot } from "@/components";
import Shape from "./Shape";
import Dimensions from "./Dimensions";

export default {
  name: "Draw",

  components: {
    SvgRoot,
    Dimensions,
    Shape
  },

  computed: {
    ...mapGetters({
      shape: "shape/shape"
    }),
    width() {
      return parseInt(this.shape.width, 10) + 50;
    },
    height() {
      return parseInt(this.shape.height, 10) + 50;
    }
  }
};
</script>
