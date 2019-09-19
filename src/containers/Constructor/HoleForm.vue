<template>
   <div class="hole-form">
      <h3 class="hole-form__title">Добавить отверстие:</h3>

      <!-- position-->
      <div class="hole-form__section">
        <div class="hole-form__col">
          <FormItem label="Расположение:" class="form__item">
            <HolePosition :id="id"/>
          </FormItem>
        </div>
        <div class="hole-form__col">
          <FormItem class="form__item"
            label="Ось X:"
            v-if="isRectangleShape || isTriangleShape"
            htmlFor="position.x"
          >
            <Input
              v-model="x"
              name="position.x"
              placeholder="0 мм"
              type="number"
              :min="0"
              block
            />
          </FormItem>

          <FormItem class="form__item"
            label="Ось Y:"
            v-if="isRectangleShape || isTriangleShape"
            htmlFor="position.y"
          >
            <Input
              v-model="y"
              name="position.y"
              type="number"
              placeholder="0 мм"
              :min="0"
              block
            />
          </FormItem>

          <FormItem class="form__item"
            label="Угол α°:"
            v-if="isCircleShape"
            htmlFor="position.angle"
          >
            <Input
              v-model="angle"
              name="position.angle"
              placeholder="0 deg"
              type="number"
              block
            />
          </FormItem>

          <FormItem class="form__item"
            label="Расстояние L:"
            v-if="isCircleShape"
            htmlFor="position.l"
          >
            <Input
              v-model="l"
              name="position.l"
              placeholder="0 мм"
              type="number"
              :min="0"
              block
            />
          </FormItem>
        </div>
      </div>

      <!-- shape -->
      <div class="hole-form__section">
        <div class="hole-form__col">
          <FormItem class="form__item"
            label="Форма:"
            v-if="isRectangleShape"
          >
            <InputGroup theme="inline rounded grow">
              <Radio
                v-for='{ label, value, className } in [
                  {
                    label: "Прямоугольник",
                    value: "rectangle",
                    className: [
                      "vue_radio-sw-shape",
                      "vue_radio-sw-shape_rectangle"
                    ]
                  },
                  {
                    label: "Круг",
                    value: "circle",
                    className: [
                      "vue_radio-sw-shape",
                      "vue_radio-sw-shape_circle"
                    ]
                  }
                ]'
                theme="button"
                :key="label"
                :value="value"
                :boxHelper="false"
                v-model="type"
              >
                <span :class="className"></span>
                <span class="visuallyhidden">{{ label }}</span>
              </Radio>
            </InputGroup>
          </FormItem>

          <FormItem class="form__item"
            label="Радиус углов:"
            v-if="isRectangleHole"
            htmlFor="hole.radius"
          >
            <Input
              v-model="radius"
              name="hole.radius"
              placeholder="0 мм"
              type="number"
              :min="0"
              block
            />
          </FormItem>
        </div>
        <div class="hole-form__col">
          <FormItem class="form__item"
            label="Длина:"
            v-if="isRectangleHole"
            htmlFor="hole.width"
          >
            <Input
              v-model="width"
              name="hole.width"
              placeholder="0 мм"
              type="number"
              :min="1"
              block
            />
          </FormItem>

          <FormItem class="form__item"
            label="Ширина:"
            v-if="isRectangleHole"
            htmlFor="hole.height"
          >
            <Input
              v-model="height"
              name="hole.height"
              placeholder="0 мм"
              type="number"
              :min="1"
              block
            />
          </FormItem>
        </div>


      </div>

      <div class="hole-form__section">
        <div class="hole-form__col hole-form__col_full-width">
          <FormItem class="form__item"
            label="Диаметр отверстия:"
            v-if="isCircleleHole"
            htmlFor="hole.diameter"
          >
            <Input
              v-model="diameter"
              name="hole.diameter"
              type="number"
              :min="1"
              block
            />
          </FormItem>
        </div>
      </div>

      <!-- controls-->
      <div class="hole-form__controls">
        <div class="hole-form__controls-item">
          <Button
            @click="handleCancleClick"
            color="gray"
            theme="solid rounded"
            block
          >
            Отмена
          </Button>
        </div>
        <div class="hole-form__controls-item">
          <Button
            @click="handleAddClick"
            color="blue"
            theme="solid rounded"
            block
          >
            {{
              holeEditMode === "new"
              ? "Добавить"
              : "Сохранить"
            }}
          </Button>
        </div>
      </div>
    </div>
</template>


<script>
import { mapMutations, mapActions, mapState, mapGetters } from "vuex";

import { REMOVE_HOLE, UPDATE_HOLE } from "@/store/mutation-types";
import { HOLE_EDIT_CLOSE } from "@/store/action-types";

import {
  Input,
  Radio,
  Fieldset,
  FormItem,
  Button,
  InputGroup
} from "@/components";
import HolePosition from "@/containers/Constructor/HolePosition";

export default {
  name: "ConstructorHoleForm",

  components: {
    Input,
    Radio,
    Fieldset,
    FormItem,
    Button,
    HolePosition,
    InputGroup
  },

  props: {
    id: {
      type: String
    }
  },

  computed: {
    type: {
      get() {
        return this.$store.state.shape.holes[this.id].type;
      },
      set(value) {
        const path = `holes.${this.id}.type`;
        this.$store.commit("shape/updateField", {
          path,
          value
        });
      }
    },
    x: {
      get() {
        return this.$store.state.shape.holes[this.id].position.x;
      },
      set(value) {
        const path = `holes.${this.id}.position.x`;
        this.$store.commit("shape/updateField", {
          path,
          value
        });
      }
    },
    y: {
      get() {
        return this.$store.state.shape.holes[this.id].position.y;
      },
      set(value) {
        const path = `holes.${this.id}.position.y`;
        this.$store.commit("shape/updateField", {
          path,
          value
        });
      }
    },
    l: {
      get() {
        return this.$store.state.shape.holes[this.id].position.l;
      },
      set(value) {
        const path = `holes.${this.id}.position.l`;
        this.$store.commit("shape/updateField", {
          path,
          value
        });
      }
    },
    angle: {
      get() {
        return this.$store.state.shape.holes[this.id].position.angle;
      },
      set(value) {
        const path = `holes.${this.id}.position.angle`;
        this.$store.commit("shape/updateField", {
          path,
          value
        });
      }
    },
    width: {
      get() {
        return this.$store.state.shape.holes[this.id].width;
      },
      set(value) {
        const path = `holes.${this.id}.width`;
        this.$store.commit("shape/updateField", {
          path,
          value
        });
      }
    },
    height: {
      get() {
        return this.$store.state.shape.holes[this.id].height;
      },
      set(value) {
        const path = `holes.${this.id}.height`;
        this.$store.commit("shape/updateField", {
          path,
          value
        });
      }
    },
    radius: {
      get() {
        return this.$store.state.shape.holes[this.id].radius;
      },
      set(value) {
        const path = `holes.${this.id}.radius`;
        this.$store.commit("shape/updateField", {
          path,
          value
        });
      }
    },
    diameter: {
      get() {
        return this.$store.state.shape.holes[this.id].diameter;
      },
      set(value) {
        const path = `holes.${this.id}.diameter`;
        this.$store.commit("shape/updateField", {
          path,
          value
        });
      }
    },
    isRectangleHole() {
      return this.type === "rectangle";
    },
    isCircleleHole() {
      return this.type === "circle";
    },
    ...mapState({
      holeEditMode: state => state.holeEdit.params.mode || "new"
    }),
    ...mapGetters({
      getHoleById: "shape/getHoleById",
      isRectangleShape: "shape/isRectangle",
      isTriangleShape: "shape/isTriangle",
      isCircleShape: "shape/isCircle"
    })
  },

  created() {
    this.holeSnapShot = JSON.parse(JSON.stringify(this.getHoleById(this.id)));
  },

  beforeUpdate() {
    if (this.isTriangleShape || this.isCircleShape) {
      this.type = "circle";
    }
  },

  methods: {
    ...mapMutations({
      removeHole: `shape/${REMOVE_HOLE}`,
      updateHole: `shape/${UPDATE_HOLE}`
    }),
    ...mapActions({
      holeEditClose: `holeEdit/${HOLE_EDIT_CLOSE}`
    }),
    handleCancleClick() {
      if (this.holeEditMode === "new") {
        this.removeHole(this.id);
      }

      if (this.holeEditMode === "edit") {
        this.updateHole({ id: this.id, data: this.holeSnapShot });
      }

      this.holeEditClose();
    },
    handleAddClick() {
      this.holeEditClose();
    }
  }
};
</script>
