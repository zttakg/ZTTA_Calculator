<template>
  <span :class="classes">
    <select
      class="form-control form-control_type_select select__control"
      :id="name"
      :name="name"
      :value="value"
      :multiple="multiple"
      :disabled="disabled"
      @input="handleInput"
    >
      <option
        v-if="placeholder"
        class="select__placeholder"
        value=""
        :selected="value === '' ? 'selected' : false"
        disabled
      >
        {{ placeholder }}
      </option>
      <option
        v-if="hasOptions"
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :label="option.label"
        :disabled="option.disabled"
        :selected="option.value === value ? 'selected' : false"
        :hidden="option.hidden"
      >
        {{ option.label }}
      </option>
      <slot v-if="!hasOptions"></slot>
    </select>
  </span>
</template>

<script>
export default {
  name: "Select",

  props: {
    value: {
      default: 0
    },
    name: String,
    theme: {
      type: String,
      default: "default"
    },
    options: {
      type: Array,
      default() {
        return [];
      }
    },
    placeholder: String,
    disabled: Boolean,
    multiple: {
      type: Boolean,
      default: false
    },
    block: Boolean
  },

  computed: {
    classes() {
      const themes = this.theme
        .split(" ")
        .filter(t => t !== "")
        .map(t => `select_style_${t}`);

      return [
        "select",
        {
          [`select_type_${this.type}`]: this.type,
          select_block: this.block,
          select_inline: !this.block
        },
        ...themes
      ];
    },
    hasOptions() {
      return this.options.length > 0;
    }
  },

  methods: {
    handleInput(event) {
      this.$emit("input", event.target.value);
    }
  }
};
</script>
