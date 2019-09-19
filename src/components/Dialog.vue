<template>
  <div
    :class="classes"
    :id="name"
    role="dialog"
    aria-modal="true"
    :aria-labelledby="`${name}-dialog__title`"
  >
    <header v-if="(title || close)" class="dialog__header">
      <h2 class="dialog__title" :id="`${name}-dialog__title`">{{ title }}</h2>
      <Button v-if="close" @click="close" class="dialog__close">
        <Icon name="close" />
        <span class="visuallyhidden">Close this dialog window</span>
      </Button>
    </header>

    <main class="dialog__content">
      <slot></slot>
    </main>

    <footer class="dialog__footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script>
import { Modal } from "vuex-modal";
import { Button, Icon } from "@/components";

export default {
  name: "Dialog",

  components: {
    Button,
    Icon,
    Modal
  },

  props: {
    name: {
      type: String,
      default: "dialog"
    },
    theme: String,
    title: String,
    close: Function
  },

  computed: {
    classes() {
      /* eslint-disable indent */
      const themes = this.theme
        ? this.theme
            .split(" ")
            .filter(t => t !== "")
            .map(t => `dialog_theme_${t}`)
        : [];
      /* eslint-enable indent */

      const classes = ["dialog", ...themes];

      return classes;
    }
  }
};
</script>
