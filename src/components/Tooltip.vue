<template>
  <transition name="tooltip">
    <div
      :class="classes"
      v-if="open"
    >
      <div v-if="arrow" class="tooltip__arrow" />
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Tooltip",

  props: {
    open: {
      type: Boolean,
      default: false
    },
    arrow: {
      type: Boolean,
      default: true
    },
    theme: String
  },

  computed: {
    classes() {
      /* eslint-disable indent */
      const themes = this.theme
        ? this.theme
            .split(" ")
            .filter(t => t !== "")
            .map(t => `tooltip_theme_${t}`)
        : [];
      /* eslint-enable indent */

      const classes = ["tooltip", ...themes];

      return classes;
    }
  }
};
</script>


<style lang="stylus" scoped>
.tooltip
  &-enter-active
  &-leave-active
    transition opacity 300ms
    will-change opacity

  &-enter
  &-leave-to
    opacity 0
</style>
