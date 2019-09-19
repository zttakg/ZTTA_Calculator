<template>
  <div :class="['switcher', value ? 'switcher_on' : 'switcher_off']">
    <div class="switcher__inactive-text">{{ inactiveText }}</div>
    <Checkbox
      class="checkbox_type_toggle-sw"
      :value="value"
      :checked="value"
      @input="onInput"
    />
    <div class="switcher__active-text">{{ activeText }}</div>
  </div>
</template>

<script>
import Checkbox from "@/components/Checkbox";

export default {
  name: "Switcher",

  components: {
    Checkbox
  },

  props: {
    value: Boolean,
    activeText: String,
    inactiveText: String
  },

  methods: {
    onInput() {
      const newValue = !this.value;

      this.checked = newValue;
      this.$emit("input", newValue);
    }
  }
};
</script>
