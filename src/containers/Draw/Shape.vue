<template>
  <g data-name="shape">
    <SvgRectangle
      v-if="isRectangle"
      :width="shape.width"
      :height="shape.height"
      :radius="shape.radius"
      :style="style"
    />

    <SvgCircle
      v-if="isCircle"
      :diameter="shape.diameter"
      :style="style"
    />

    <SvgTriangle
      v-if="isTriangle"
      :side1="shape.side1"
      :side2="shape.side2"
      :style="style"
    />

    <HolesList />
  </g>
</template>

<script>
import { SHAPE_STYLE } from "@/constants";
import { mapGetters } from "vuex";
import { SvgRectangle, SvgCircle, SvgTriangle } from "@/components";
import HolesList from "./HolesList";

export default {
  name: "DrawShape",

  components: {
    SvgRectangle,
    SvgCircle,
    SvgTriangle,
    HolesList
  },

  data() {
    return {
      style: SHAPE_STYLE
    };
  },

  computed: {
    ...mapGetters({
      shape: "shape/shape",
      isRectangle: "shape/isRectangle",
      isCircle: "shape/isCircle",
      isTriangle: "shape/isTriangle",
      isHaveHoles: "shape/isHaveHoles"
    })
  }
};
</script>
