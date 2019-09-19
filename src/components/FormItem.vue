
<template>
  <div :class="classes">
    <div v-if="label" class="form-item__label">
      <label v-if="htmlFor" :for="htmlFor" class="label" v-html="label" />
      <span v-else class="label" v-html="label" />
    </div>
    <div class="form-item__control">
      <slot></slot>
    </div>
    <ul v-if="errors.length > 0" class="form-item__errors">
      <li v-for="(error, index) in errors" :key="index">{{ error.message }}</li>
    </ul>
  </div>
</template>

<script>
import types from "@/helpers/propTypes";

export default {
  name: "FormItem",

  props: {
    label: String,
    labelPosition: {
      validator: types.enum(["top", "left", "right"]),
      default: "top"
    },
    htmlFor: String,
    errors: {
      type: Array,
      default: () => []
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
            .map(t => `form-item_style_${t}`)
        : [];
      /* eslint-enable indent */

      const classes = [
        "form-item",
        {
          [`form-item_label_${this.labelPosition}`]: this.labelPosition
        },
        ...themes
      ];

      return classes;
    }
  }
};
</script>
