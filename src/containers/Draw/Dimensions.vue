<template>
  <g data-name="dimension-lines">
    <DimensionLine
      v-for="orientation in ['horizontal', 'vertical']"
      v-if="!(type === 'circle' && orientation !== 'horizontal')"
      :key="orientation"
      :orientation="orientation"
      :width="shape.width"
      :height="shape.height"
      :diameter="shape.diameter"
      :side1="shape.side1"
      :side2="shape.side2"
      :type="type"
      :radius="shape.radius"
    />
  </g>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { DimensionLine } from "@/components";

export default {
  name: "DrawDimensions",

  components: {
    DimensionLine
  },

  computed: {
    ...mapState({
      type: state => state.shape.type
    }),
    ...mapGetters({
      shape: "shape/shape"
    })
  }
};
</script>
