
<template>
  <div class="constructor-wrapper">
    <div class="constructor-wrapper__section">
      <div class="constructor-wrapper__form">

        <div class="constructor-wrapper__col">
          <div class="constructor-wrapper__col-wrapper">
            <h2 class="constructor-wrapper__col-title">Конфигурации детали:</h2>

            <FormItem class="form__item"
              label="Название детали:"
              :errors="validation.title"
              htmlFor="title"
            >
              <Input
                v-model="title"
                name="title"
                placeholder="Название детали"
                block
              />
            </FormItem>

             <FormItem class="form__item"
              label="Тип резки:"
              :errors="validation.cutType"
              htmlFor="cutType"
            >
              <Fieldset>
                <Select
                  :options="cutTypesOptions"
                  placeholder="Выберите тип резки"
                  v-model="cutType"
                  name="cutType"
                  block
                />
              </Fieldset>
            </FormItem>

            <FormItem class="form__item"
              label="Форма детали:"
              :errors="validation.type"
              htmlFor="type"
            >
              <Fieldset>
                <Select
                  :options='[
                    { label: "Квадрат/Прямоугольник", value: "rectangle" },
                    { label: "Круг", value: "circle" },
                    { label: "Треугольник", value: "triangle" }
                  ]'
                  placeholder="Выберите форму"
                  v-model="type"
                  name="type"
                  block
                />
              </Fieldset>
            </FormItem>

            <Rectangle class="form__item" v-if="isRectangle" />
            <ConstructorCircle class="form__item" v-if="isCircle" />
            <Triangle class="form__item" v-if="isTriangle" />

            <FormItem class="form__item"
              label="Материал детали:"
              :errors="validation.material"
              htmlFor="material"
            >
              <Select
                v-model="material"
                name="material"
                :options="cutMaterialsOptions"
                placeholder="Выберите материал"
                :disabled="cutMaterialsOptions.length <= 0"
                block
              />
            </FormItem>

            <FormItem class="form__item"
              label="Количество деталей:"
              :errors="validation.quantity"
              htmlFor="quantity"
            >
              <Input
                v-model="quantity"
                name="quantity"
                type="number"
                placeholder="Количество деталей"
                :min="1"
                icon="form_quantity"
                block
              />
            </FormItem>
          </div>
        </div>

        <div class="constructor-wrapper__col">
          <div class="constructor-wrapper__draft">
            <Draw />
          </div>
          <div class="constructor-wrapper__draft-controls">
            <div class="constructor-wrapper__draft-controls-item">
              <Button
                @click="caclulate"
                color="blue"
                size="large"
                theme="gradient solid rounded bold uppercase letter-spacing"
                icon
              >
                <Icon name="calculator" />
                <span>Рассчитать стоимость</span>
              </Button>
            </div>
            <div class="constructor-wrapper__draft-controls-item">
              <Button
                @click="save"
                :disabled="isSend"
                color="blue"
                theme="transparent solid rounded"
                icon
              >
                <Icon name="save" />
                <span>Сохранить деталь</span>
              </Button>
            </div>
          </div>
        </div>

        <div class="constructor-wrapper__col" v-if="isHoleEditVisible">
          <HoleForm :id="holeEditParams.id" />
        </div>

        <div class="constructor-wrapper__col" v-else>
          <div class="constructor-wrapper__col-wrapper">
            <h2 class="constructor-wrapper__col-title">Отверстия:</h2>
          </div>
          <HolesList />
        </div>

      </div>
    </div>


    <h2 v-if="cost" class="section-title">Результат рассчета:</h2>
    <Results v-if="cost" :data="cost" />

    <RemoveHoleModal />

  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import { createHelpers } from "vuex-map-fields";

import { Button, Icon, FormItem, Fieldset, Input, Select } from "@/components";

import Rectangle from "@/containers/Constructor/Rectangle";
import ConstructorCircle from "@/containers/Constructor/Circle";
import Triangle from "@/containers/Constructor/Triangle";
import HolesList from "@/containers/Constructor/HolesList";
import Results from "@/containers/Constructor/Results";
import HoleForm from "@/containers/Constructor/HoleForm";
import RemoveHoleModal from "@/containers/Constructor/RemoveHoleModal";
import Draw from "@/containers/Draw/Draw";

import {
  SET_ERRORS,
  CALCULATE_COST,
  SAVE_SHAPE,
  UPDATE_SHAPE,
  UPDATE_SHAPE_ORDER
} from "@/store/action-types";
import CutTypeTransformer from "@/transformers/CutTypeTransformer";
import CutMaterialTransformer from "@/transformers/CutMaterialTransformer";

const { mapFields } = createHelpers({
  getterType: "shape/getField",
  mutationType: "shape/updateField"
});

export default {
  name: "ConsturctorWrapper",

  components: {
    Rectangle,
    ConstructorCircle,
    Triangle,
    HolesList,
    Results,
    HoleForm,
    RemoveHoleModal,
    Draw,
    Button,
    Icon,
    FormItem,
    Fieldset,
    Input,
    Select
  },

  data() {
    return {
      isSend: false,
      cost: null
    };
  },

  computed: {
    ...mapFields(["type", "title", "quantity", "cutType", "material"]),
    ...mapState({
      isHoleEditVisible: state => state.holeEdit.visible,
      holeEditParams: state => state.holeEdit.params,
      shape: state => state.shape,
      cutTypesData: state => state.settings.cutTypes,
      cutMaterialsData: state => state.settings.cutMaterials,
      validation: state => state.errors.validation
    }),
    ...mapGetters({
      isRectangle: "shape/isRectangle",
      isCircle: "shape/isCircle",
      isTriangle: "shape/isTriangle"
    }),
    cutTypes() {
      return new CutTypeTransformer(this.cutTypesData);
    },
    cutMaterials() {
      return new CutMaterialTransformer(this.cutMaterialsData);
    },
    cutTypesOptions() {
      return this.cutTypes.getOptionsList();
    },
    cutMaterialsIds() {
      return this.cutType ? this.cutTypes.getCutMaterialsIds(this.cutType) : [];
    },
    cutMaterialsOptions() {
      return this.cutType
        ? this.cutMaterials.getOptionsList(this.cutMaterialsIds)
        : [];
    }
  },

  methods: {
    ...mapActions({
      setErrors: `errors/${SET_ERRORS}`,
      saveShape: `shape/${SAVE_SHAPE}`,
      updateShapeOrder: `shape/${UPDATE_SHAPE_ORDER}`,
      updateShape: `shape/${UPDATE_SHAPE}`,
      calculateCost: `shape/${CALCULATE_COST}`
    }),
    save() {
      const { params, name } = this.$route;
      this.isSend = true;

      if (name === "constructor/order") {
        if (params.id) {
          this.updateShapeOrder(params.id);
        }
      } else if (name === "constructor/edit") {
        if (params.id) {
          this.updateShape(params.id);
        } else {
          this.saveShape().then(() => {
            this.isSend = false;
          });
        }
      }
    },
    caclulate() {
      this.calculateCost().then(data => {
        this.cost = data.cost || null;
      });
    }
  }
};
</script>
