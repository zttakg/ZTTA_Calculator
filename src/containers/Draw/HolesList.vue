<template>
  <g id="draw__holes" v-if="isHaveHoles">
    <Hole v-for="hole in holes" :key="hole" :id="hole" />
  </g>
</template>

<script>
import { mapGetters } from "vuex";
import Hole from "./Hole";

export default {
  name: "DrawHolesList",

  components: {
    Hole
  },

  computed: {
    ...mapGetters({
      holes: "shape/getHolesAllIds",
      isHaveHoles: "shape/isHaveHoles"
    })
  }
};
</script>
