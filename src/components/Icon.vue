<template>
  <svg v-if="name" :class="['icon', `icon_${name}`]" role="img">
    <title v-if="title">{{ title }}</title>
    <use :xlink:href="`${spritePath}#${name}`"></use>
  </svg>
</template>

<script>
import { SVG_ICONS_SPRITE_PATH } from "@/constants";

export default {
  name: "Icon",

  props: {
    name: String,
    title: String
  },

  data() {
    return {
      spritePath: SVG_ICONS_SPRITE_PATH
    };
  }
};
</script>
