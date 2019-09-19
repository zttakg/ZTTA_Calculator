<script>
export default {
  name: "Button",

  props: {
    type: {
      type: String,
      default: "button"
    },
    color: String,
    to: {
      type: String,
      default: null
    },
    size: {
      type: String,
      default: "medium"
    },
    theme: String,
    block: Boolean,
    disabled: Boolean,
    icon: Boolean,
    value: null
  },

  computed: {
    classes() {
      /* eslint-disable indent */
      const themes = this.theme
        ? this.theme
            .split(" ")
            .filter(t => t !== "")
            .map(t => `button_style_${t}`)
        : [];
      /* eslint-enable indent */

      const classes = [
        "button",
        {
          [`button_color_${this.color}`]: this.color,
          [`button_size_${this.size}`]: this.size,
          button_block: this.block,
          button_disabled: this.disabled,
          button_icon: this.icon
        },
        ...themes
      ];

      return classes;
    }
  },

  methods: {
    handleClick(event) {
      this.$emit("click", event);
    }
  },

  // eslint-disable-next-line no-unused-vars
  render(h) {
    const ButtonTag = this.to ? "a" : "button";
    const type = this.to ? null : this.type;

    return (
      <ButtonTag
        onClick={this.handleClick}
        class={this.classes}
        type={type}
        href={this.to}
      >
        {this.$slots.default}
      </ButtonTag>
    );
  }
};
</script>
