<template>
  <ConstructorWrapper />
</template>

<script>
import { mapActions } from "vuex";

import { LOAD_SHAPE_ORDER } from "@/store/action-types";

import ConstructorWrapper from "@/containers/Constructor/Wrapper";

export default {
  name: "ConstructorEditOrder",

  components: {
    ConstructorWrapper
  },

  watch: {
    $route(to, from) {
      if (to.params.id && from.params.id !== to.params.id) {
        this.loadShapeOrder(to.params.id);
      }
    }
  },

  created() {
    const { params } = this.$route;

    if (params.id) {
      this.loadShapeOrder(params.id);
    }
  },

  methods: {
    ...mapActions({
      loadShapeOrder: `shape/${LOAD_SHAPE_ORDER}`
    })
  }
};
</script>
