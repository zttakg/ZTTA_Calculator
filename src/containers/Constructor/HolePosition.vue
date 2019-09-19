<template>
  <div
    :class="classes"
    @mouseover="tooltipIsOpen = true"
    @mouseout="tooltipIsOpen = false"
  >
    <Button
      class="hole-position__hole-switch"
      @click="switchHolePosition"
      title="Переключить точку отсчета отверстия"
    >
      <span class="visuallyhidden">Переключить точку отсчета отверстия</span>
    </Button>

    <Radio
      v-if="isRectangle"
      v-for='{ value, label } in [
          { label: "Верхний левый угол", value: "top-left" },
          { label: "Верхний правый угол", value: "top-right" },
          { label: "Нижний правый угол", value: "bottom-right" },
          { label: "Нижний левый угол", value: "bottom-left" }
        ]'
      :key="value"
      :value="value"
      :label="label"
      v-model="rectanglePoint"
      name="hole-position_rectangle"
      :labelHidden="true"
      :class="[
        'radio_only-marker',
        'hole-position__item-shape',
        `hole-position__item-shape_${value}`
      ]"
    />

    <Radio
      v-if="isCircle"
      v-for='{ value, label } in [
        { label: "От края фигуры", value: "side" },
        { label: "От центра фигуры", value: "center" }
      ]'
      :key="value"
      :value="value"
      :label="label"
      v-model="circlePoint"
      name="hole-position_circle"
      :labelHidden="true"
      :class="[
        'radio_only-marker',
        'hole-position__item-shape',
        `hole-position__item-shape_${value}`
      ]"
    />

    <Tooltip
      theme="dark"
      x-placement="left"
      :open="tooltipIsOpen"
      :style="`
        width: 261px;
        min-width: auto;
        left: -295px;
        top: 9px;
      `"
    >
      <div class="hole-position-tooltip">
        <div class="hole-position-tooltip__label">
          Укажите точку отсчета отверстия:
        </div>
        <Radio
          v-for='{ value, label } in [
            { label: "край отверстия", value: "side" },
            { label: "центр отверстия", value: "center" }
          ]'
          :key="value"
          :value="value"
          :label="label"
          v-model="holePoint"
          theme="nano-blue"
          name="hole-position-tooltip"
          class="hole-position-tooltip__radio"
        />
      </div>
    </Tooltip>
  </div>
</template>


<script>
import { Radio, FormItem, Fieldset, Tooltip, Button } from "@/components";
import { mapState, mapGetters } from "vuex";

export default {
  name: "ConstructorHolePosition",

  components: {
    Radio,
    Fieldset,
    FormItem,
    Tooltip,
    Button
  },

  props: {
    id: String
  },

  data() {
    return {
      tooltipIsOpen: false
    };
  },

  computed: {
    ...mapState({
      shapeType: state => state.shape.type
    }),
    ...mapGetters({
      isRectangle: "shape/isRectangle",
      isTriangle: "shape/isTriangle",
      isCircle: "shape/isCircle"
    }),
    rectanglePoint: {
      get() {
        return this.$store.state.shape.holes[this.id].position.zeroPoint
          .rectangle;
      },
      set(value) {
        const path = `holes.${this.id}.position.zeroPoint.rectangle`;
        this.$store.commit("shape/updateField", {
          path,
          value
        });
      }
    },
    trianglePoint: {
      get() {
        return this.$store.state.shape.holes[this.id].position.zeroPoint
          .triangle;
      },
      set(value) {
        const path = `holes.${this.id}.position.zeroPoint.triangle`;
        this.$store.commit("shape/updateField", {
          path,
          value
        });
      }
    },
    circlePoint: {
      get() {
        return this.$store.state.shape.holes[this.id].position.zeroPoint.circle;
      },
      set(value) {
        const path = `holes.${this.id}.position.zeroPoint.circle`;
        this.$store.commit("shape/updateField", {
          path,
          value
        });
      }
    },
    hole() {
      return this.$store.state.shape.holes[this.id];
    },
    holeType() {
      return this.hole.type;
    },
    holePoint: {
      get() {
        return this.$store.state.shape.holes[this.id].position.zeroPoint.hole;
      },
      set(value) {
        const path = `holes.${this.id}.position.zeroPoint.hole`;
        this.$store.commit("shape/updateField", {
          path,
          value
        });
      }
    },
    shapePosition() {
      switch (this.shapeType) {
        case "rectangle":
          return this.rectanglePoint;
        case "circle":
          return this.circlePoint;
        case "triangle":
          return this.trianglePoint;

        default:
          return "";
      }
    },
    classes() {
      return [
        "hole-position",
        `hole-position_shape-type_${this.shapeType}`,
        `hole-position_shape-position_${this.shapePosition}`,
        `hole-position_hole-type_${this.holeType}`,
        `hole-position_hole-position_${this.holePoint}`
      ];
    }
  },

  methods: {
    switchHolePosition() {
      this.holePoint = this.holePoint === "side" ? "center" : "side";
    }
  }
};
</script>
