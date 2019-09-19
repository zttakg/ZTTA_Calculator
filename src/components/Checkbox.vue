<template>
  <label :class="classes" :for="id">
    <input
      class="form-control form-control_type_checkbox checkbox__control"
      type="checkbox"
      :id="id"
      :name="name"
      :value="value"
      :class="className"
      :required="required"
      :disabled="disabled"
      @change="onChange"
      :checked="state"
    />
    <span class="checkbox__box"></span>
    <span v-if="label || hasSlot()" class="checkbox__label">
      {{ label }}
      <slot></slot>
    </span>
  </label>
</template>

<script>
import uid from "@/helpers/generateId";
import SlotMixin from "@/mixins/slot";

export default {
  name: "Checkbox",

  mixins: [SlotMixin],

  model: {
    prop: "modelValue",
    event: "input"
  },

  props: {
    id: {
      type: String,
      default() {
        return `checkbox-id-${uid()}`;
      }
    },
    name: {
      type: String,
      default: null
    },
    value: {
      default: ""
    },
    modelValue: {
      default: undefined
    },
    className: {
      type: String,
      default: null
    },
    theme: {
      type: String,
      default: "default"
    },
    label: String,
    checked: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    model: {}
  },

  computed: {
    classes() {
      const themes = this.theme
        .split(" ")
        .filter(t => t !== "")
        .map(t => `checkbox_style_${t}`);

      return ["checkbox", ...themes];
    },
    state() {
      if (this.modelValue === undefined) {
        return this.checked;
      }
      if (Array.isArray(this.modelValue)) {
        return this.modelValue.indexOf(this.value) > -1;
      }
      return !!this.modelValue;
    }
  },

  watch: {
    checked(newValue) {
      if (newValue !== this.state) {
        this.toggle();
      }
    }
  },

  mounted() {
    if (this.checked && !this.state) {
      this.toggle();
    }
  },

  methods: {
    onChange() {
      this.toggle();
    },
    toggle() {
      let value;
      if (Array.isArray(this.modelValue)) {
        value = this.modelValue.slice(0);
        if (this.state) {
          value.splice(value.indexOf(this.value), 1);
        } else {
          value.push(this.value);
        }
      } else {
        value = !this.state;
      }
      this.$emit("input", value);
    }
  }
};
</script>
