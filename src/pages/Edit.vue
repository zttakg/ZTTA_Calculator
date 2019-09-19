<template>
  <ConstructorWrapper />
</template>

<script>
import { mapActions } from "vuex";

import { LOAD_SHAPE } from "@/store/action-types";

import ConstructorWrapper from "@/containers/Constructor/Wrapper";

export default {
  name: "ConstructorEdit",

  components: {
    ConstructorWrapper
  },

  watch: {
    $route(to, from) {
      if (to.params.id && from.params.id !== to.params.id) {
        this.loadShape(to.params.id);
      }
    }
  },

  created() {
    const { params } = this.$route;

    if (params.id) {
      this.loadShape(params.id);
    }
  },

  methods: {
    ...mapActions({
      loadShape: `shape/${LOAD_SHAPE}`
    })
  }
};
</script>
