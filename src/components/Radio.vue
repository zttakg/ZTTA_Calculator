<template>
  <label :class="classes" :for="id">
    <input
      class="form-control form-control_type_radio radio__control"
      type="radio"
      :id="id"
      :name="name"
      :value="value"
      :class="className"
      :required="required"
      :disabled="disabled"
      @change="onChange"
      :checked="state"
    />
    <span class="radio__box" v-if="boxHelper"></span>
    <span v-if="label || hasSlot()"
      :class="[
        'radio__label',
        { 'visuallyhidden' :labelHidden }
      ]">
      <template v-if="!hasSlot()">{{ label }}</template>
      <slot></slot>
    </span>
  </label>
</template>

<script>
import uid from "@/helpers/generateId";
import SlotMixin from "@/mixins/slot";

export default {
  name: "Radio",

  mixins: [SlotMixin],

  model: {
    prop: "modelValue",
    event: "input"
  },

  props: {
    id: {
      type: String,
      default() {
        return `radio-id-${uid()}`;
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
    labelHidden: {
      type: Boolean,
      default: false
    },
    boxHelper: {
      type: Boolean,
      default: true
    },
    baseClass: {
      type: String,
      default: "radio"
    },
    model: {}
  },

  computed: {
    classes() {
      const themes = this.theme
        .split(" ")
        .filter(t => t !== "")
        .map(t => `${this.baseClass}_style_${t}`);

      return [
        this.baseClass,
        {
          [`${this.baseClass}_checked`]: this.state
        },
        ...themes
      ];
    },
    state() {
      if (this.modelValue === undefined) {
        return this.checked;
      }
      return this.modelValue === this.value;
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
      this.$emit("input", this.state ? "" : this.value);
    }
  }
};
</script>
