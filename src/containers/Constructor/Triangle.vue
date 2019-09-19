<template>
  <div class="triangle">
    <div class="form__item input-group">
      <FormItem class="input-group__item"
        label="Катет 1:"
        :errors="validation['triangle.side1']"
        htmlFor="side1"
      >
        <Input
          v-model="side1"
          name="side1"
          type="number"
          placeholder="Катет 1"
          :min="limits.height.min"
          :max="limits.height.max"
          icon="form_height"
          block
        />
      </FormItem>

      <FormItem class="input-group__item"
        label="Катет 2:"
        :errors="validation['triangle.side2']"
        htmlFor="side2"
      >
        <Input
          v-model="side2"
          name="side2"
          type="number"
          placeholder="Катет 2"
          :min="limits.width.min"
          :max="limits.width.max"
          icon="form_width"
          block
        />
      </FormItem>
    </div>
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
  name: "ConstructorTriangle",

  components: {
    Input,
    FormItem
  },

  computed: {
    ...mapFields({
      side1: "triangle.side1",
      side2: "triangle.side2"
    }),
    ...mapGetters({
      limits: "materialLimits"
    }),
    ...mapState({
      validation: state => state.errors.validation
    })
  }
};
</script>
