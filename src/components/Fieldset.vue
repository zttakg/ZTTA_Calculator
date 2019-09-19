<script>
export default {
  name: "Fieldset",

  props: {
    legend: String
  },

  // eslint-disable-next-line no-unused-vars
  render(h) {
    return (
      <fieldset class="fieldset">
        {this.legend && <legend class="fieldset__legend">{this.legend}</legend>}
        {this.$slots.default &&
          this.$slots.default.map(child => (
            <div class="fieldset__item">{child}</div>
          ))}
      </fieldset>
    );
  }
};
</script>
