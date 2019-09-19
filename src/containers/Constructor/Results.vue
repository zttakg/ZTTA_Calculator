<template>
  <div class="results-table">
    <div class="results-table__section-item">
      <div class="results-table__top">
        <div class="results-table__item">
          <div class="results-table__label">
            <span>Стоимость</span>
          </div>
          <div class="results-table__text">
            <span>{{ data.price | currency }} сом</span>
          </div>
        </div>
        <div class="results-table__item">
          <div class="results-table__label">
            <span>Изготовление</span>
            <Button class="results-table__tip"
              data-tooltip-id="tip"
              data-tooltip-placement="top"
              @click="tooltipShow"
              v-click-outside="tooltipHide"
            >
              <Icon name="question-tooltip" />
            </Button>
            <Tooltip
              :open="isTooltipOpen"
              x-placement="top"
              :style="`
                top: -43px;
                left: 356px;
              `"
            >
              В рассчет срока изготовления заказа влючаются только календарные
              рабочие дни.
            </Tooltip>
          </div>
          <div class="results-table__text">
            <span>
              {{ data.createDays | pluralize("день", "дня", "дней") }}
            </span>
          </div>
        </div>
        <div class="results-table__item ta-right">
          <Button
            @click="addToCart"
            :disabled="isLoading"
            color="green"
            theme="solid rounded"
            icon
          >
            <Icon name="cart" />
            <span>В корзину</span>
          </Button>
        </div>
      </div>
      <div class="results-table__bottom">
        <div class="results-table__section">
          <div class="results-table__item">
            <div class="results-table__label">
              <span>Форма детали:</span>
            </div>
            <div class="results-table__text">
              <span>
                {{
                  {
                    triangle: "Треугольник",
                    circle: "Круг",
                    rectangle: "Квадрат/Прямоугольник"
                  }
                  [data.shapeType]
                }}
              </span>
            </div>
          </div>
          <div class="results-table__item">
            <div class="results-table__label">
              <span>Материал детали:</span>
            </div>
            <div class="results-table__text">
              <span>{{ data.materialTitle }}</span>
            </div>
          </div>
          <div class="results-table__item">
            <div class="results-table__label">
              <span>Тип резки:</span>
            </div>
            <div class="results-table__text">
              <span>{{ data.cutTypeTitle }}</span>
            </div>
          </div>
          <div class="results-table__item">
            <div class="results-table__label">
              <span>Количество:</span>
            </div>
            <div class="results-table__text">
              <span>{{ data.count }} шт.</span>
            </div>
          </div>
        </div>
        <div class="results-table__section">
          <div class="results-table__item">
            <div class="results-table__label">
              <span>Длина - Ширина:</span>
            </div>
            <div class="results-table__text">
              <span>{{ data.width }}&nbsp;-&nbsp;{{ data.height }} мм.</span>
            </div>
          </div>
          <div class="results-table__item">
            <div class="results-table__label">
              <span>Длина реза:</span>
            </div>
            <div class="results-table__text">
              <span>{{ data.cutLength }} мм</span>
            </div>
          </div>
          <div class="results-table__item">
            <div class="results-table__label">
              <span>Площадь:</span>
            </div>
            <div class="results-table__text">
              <span>{{ data.area }} мм
                <sup>2</sup>
              </span>
            </div>
          </div>
          <div class="results-table__item">
            <div class="results-table__label">
              <span>Масса 1 детали:</span>
            </div>
            <div class="results-table__text">
              <span>{{ data.mass }} г.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Button,
  Icon,
  FormItem,
  Fieldset,
  Input,
  Select,
  Tooltip
} from "@/components";
import { mapActions } from "vuex";

import { ADD_TO_CART } from "@/store/action-types";

export default {
  name: "ConstructorResults",

  components: {
    Button,
    Icon,
    FormItem,
    Fieldset,
    Input,
    Select,
    Tooltip
  },

  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      isTooltipOpen: false,
      isLoading: false
    };
  },

  methods: {
    ...mapActions({
      addToCart: `shape/${ADD_TO_CART}`
    }),
    tooltipShow() {
      this.isTooltipOpen = true;
    },
    tooltipHide() {
      this.isTooltipOpen = false;
    },
    add() {
      this.isLoading = true;
      this.addToCart()
        .then(() => {
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
        });
    }
  }
};
</script>
