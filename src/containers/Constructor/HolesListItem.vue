<template>
  <div
    @mouseover.stop.capture="onHoleMouseOver"
    @mouseout.stop.capture="onHoleMouseOut"
    class="holes-list-item"
  >
    <div class="holes-list-item__name">Отверстие №{{ index + 1 }}</div>
    <div class="holes-list-item__controls">
      <Button @click="handleEditClick" class="holes-list-item__controls-item">
        <Icon
          name="hole-items_edit"
          :class="`
            holes-list-item__controls-icon
            holes-list-item__controls-icon_edit
          `"
        />
        <span class="visuallyhidden">Редактировать отверстие</span>
      </Button>
      <Button @click="handleRemoveClick" class="holes-list-item__controls-item">
        <Icon
          name="hole-items_delete"
          :class="`
            holes-list-item__controls-icon
            holes-list-item__controls-icon_delete
          `"
        />
        <span class="visuallyhidden">Удалить отверстие</span>
      </Button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { PUSH } from "vuex-modal";
import { HOLE_EDIT_OPEN } from "@/store/action-types";

import { Button, Icon } from "@/components";

export default {
  name: "ConstructorHolesListItem",

  components: {
    Button,
    Icon
  },

  props: {
    id: String,
    index: { type: Number, default: 1 }
  },

  data() {
    return {
      modalIsOpen: false
    };
  },

  computed: {
    ...mapGetters({
      getHoleById: "shape/getHoleById"
    }),
    hole() {
      return this.getHoleById(this.id);
    },
    isHovered: {
      get() {
        return this.$store.state.shape.holes[this.id].isHovered;
      },
      set(value) {
        const path = `holes.${this.id}.isHovered`;
        this.$store.commit("shape/updateField", {
          path,
          value
        });
      }
    }
  },

  methods: {
    ...mapActions({
      holeEditOpen: `holeEdit/${HOLE_EDIT_OPEN}`,
      openModal: PUSH
    }),
    handleEditClick() {
      this.holeEditOpen({ id: this.id, mode: "edit" });
    },
    handleRemoveClick() {
      this.openModal({ name: "deleteHole", holeId: this.id });
    },
    onHoleMouseOver() {
      if (!this.isHovered) {
        this.isHovered = true;
      }
    },
    onHoleMouseOut() {
      if (this.isHovered) {
        this.isHovered = false;
      }
    }
  }
};
</script>

<style lang="stylus">
.holes-list-item
  display flex
  align-items center

  &__title
    margin 0
    padding-right 20px
    font-size 1em

  &__controls
    margin-left auto

  &__button
    padding 8px
</style>
