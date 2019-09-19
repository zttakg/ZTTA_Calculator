<script>
export default {
  name: "InputGroup",

  props: {
    theme: String,
    baseClass: {
      type: String,
      default: "input-group"
    }
  },

  computed: {
    classNames() {
      /* eslint-disable indent */
      const themes = this.theme
        ? this.theme
            .split(" ")
            .filter(t => t !== "")
            .map(t => `${this.baseClass}_theme_${t}`)
        : [];
      /* eslint-enable indent */

      const classes = [this.baseClass, ...themes];

      return classes;
    }
  },

  // eslint-disable-next-line no-unused-vars
  render(h) {
    return (
      <div class={this.classNames}>
        {this.$slots.default &&
          // eslint-disable-next-line arrow-parens
          this.$slots.default.map(vnode => {
            const clonedVnode = vnode;
            clonedVnode.data.class = {};
            clonedVnode.data.class[`${this.baseClass}__item`] = true;
            return clonedVnode;
          })}
      </div>
    );
  }
};
</script>
