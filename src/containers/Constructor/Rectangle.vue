<template>
  <div class="rectangle">
    <div class="form__item input-group">
      <FormItem class="input-group__item"
        label="Длина:"
        :errors="validation['rectangle.height']"
        htmlFor="height"
      >
        <Input
          v-model="height"
          name="height"
          placeholder="Длина"
          type="number"
          :min="limits.height.min"
          :max="limits.height.max"
          icon="form_width"
          block
        />
      </FormItem>

      <FormItem class="input-group__item"
        label="Ширина:"
        :errors="validation['rectangle.width']"
        htmlFor="width"
      >
        <Input
          v-model="width"
          name="width"
          placeholder="Ширина"
          type="number"
          :min="limits.width.min"
          :max="limits.width.max"
          icon="form_height"
          block
        />
      </FormItem>
    </div>

    <FormItem class="form__item"
      label="Радиус углов:"
      :errors="validation['rectangle.radius']"
      htmlFor="radius"
    >
      <Input
        v-model="radius"
        name="radius"
        placeholder="Радиус углов"
        type="number"
        :min="0"
        :max="radiusMax"
        icon="form_corner-radius"
        block
      />
    </FormItem>
  </div>
</template>


<script>
import { createHelpers } from "vuex-map-fields";

import { Input, FormItem } from "@/components";
import { mapGetters, mapState } from "vuex";

const { mapFields } = createHelpers({
  getterType: "shape/getField",
  mutationType: "shape/updateField"
});

export default {
  name: "ConstructorRectangle",

  components: {
    Input,
    FormItem
  },

  computed: {
    ...mapFields({
      width: "rectangle.width",
      height: "rectangle.height",
      radius: "rectangle.radius"
    }),
    ...mapGetters({
      limits: "materialLimits"
    }),
    ...mapState({
      validation: state => state.errors.validation
    }),
    radiusMax() {
      return Math.ceil(this.width / 2);
    }
  }
};
</script>
