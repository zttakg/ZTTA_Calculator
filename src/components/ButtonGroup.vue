
<script>
export default {
  name: "ButtonGroup",

  props: {
    baseClassName: {
      type: String,
      default: "button-group"
    }
  },

  // eslint-disable-next-line no-unused-vars
  render(h) {
    return (
      <div class={this.baseClassName}>
        {this.$slots.default &&
          // eslint-disable-next-line arrow-parens
          this.$slots.default.map(vnode => {
            const clonedVnode = vnode;
            clonedVnode.data.class = {};
            clonedVnode.data.class["button-group__item"] = true;
            return clonedVnode;
          })}
      </div>
    );
  }
};
</script>
