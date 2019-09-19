<template>
  <span :class="classes">
    <span v-if="icon" class="input__icon">
      <Icon :name="icon" />
    </span>
    <input
      class="form-control form-control_type_input input__control"
      :id="name"
      :name="name"
      :type="type"
      :value="value"
      :min="min"
      :max="max"
      :placeholder="placeholder"
      @input="handleInput"
    >
  </span>
</template>

<script>
import { Icon } from "@/components";

export default {
  name: "Input",

  components: {
    Icon
  },

  props: {
    value: {},
    name: String,
    placeholder: String,
    type: {
      type: String,
      default: "text"
    },
    theme: {
      type: String,
      default: "default"
    },
    block: Boolean,
    icon: String,
    min: Number,
    max: Number
  },

  computed: {
    classes() {
      const themes = this.theme
        .split(" ")
        .filter(t => t !== "")
        .map(t => `input_style_${t}`);

      return [
        "input",
        {
          [`input_type_${this.type}`]: this.type,
          [`input_icon`]: this.icon,
          input_block: this.block
        },
        ...themes
      ];
    }
  },

  methods: {
    handleInput(event) {
      this.$emit("input", event.target.value);
    }
  }
};
</script>
