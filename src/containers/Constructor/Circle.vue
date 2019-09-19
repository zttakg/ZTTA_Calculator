<template>
  <div class="circle">
    <FormItem class="form__item"
      label="Диаметр:"
      :errors="validation['circle.diameter']"
      htmlFor="diameter"
    >
      <Input
        v-model="diameter"
        name="diameter"
        type="number"
        placeholder="Диаметр"
        :min="diameterLimitMin"
        :max="diameterLimitMax"
        icon="form_width"
        block
      />
    </FormItem>
  </div>
</template>


<script>
import { mapGetters, mapState } from "vuex";
import { createHelpers } from "vuex-map-fields";

import { Input, FormItem } from "@/components";

const { mapFields } = createHelpers({
  getterType: "shape/getField",
  mutationType: "shape/updateField"
});

export default {
  name: "ConstructorCircle",

  components: {
    Input,
    FormItem
  },

  computed: {
    ...mapFields({
      diameter: "circle.diameter"
    }),
    ...mapGetters({
      limits: "materialLimits"
    }),
    ...mapState({
      validation: state => state.errors.validation
    }),
    diameterLimitMax() {
      return Math.min(this.limits.width.max, this.limits.height.max);
    },
    diameterLimitMin() {
      return Math.max(this.limits.width.min, this.limits.height.min);
    }
  }
};
</script>
