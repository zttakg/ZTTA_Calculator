<script>
export default {
  name: "Form",

  // eslint-disable-next-line no-unused-vars
  render(h) {
    return <form class="form">{this.$slots.default}</form>;
  }
};
</script>
