<template>
  <div class="holes-list">
    <div class="holes-list__add">
      <Button @click="handleAddHoleClick"
        color="blue"
        theme="solid rounded"
        block
      >
        Добавить отверстие
      </Button>
    </div>
    <ul class="holes-list__list" v-if="holesAllIds.length > 0">
      <li
        class="holes-list__item"
        v-for="(id, index) in holesAllIds"
        :key="id"
      >
        <HolesListItem :id="id" :index="index" />
      </li>
    </ul>
  </div>
</template>


<script>
import { mapGetters, mapActions } from "vuex";
import {
  HOLE_EDIT_OPEN,
  HOLE_EDIT_CLOSE,
  ADD_HOLE
} from "@/store/action-types";

import { Button } from "@/components";
import HolesListItem from "@/containers/Constructor/HolesListItem";

export default {
  name: "ConstructorHolesList",

  components: {
    Button,
    HolesListItem
  },

  data() {
    return {
      holeId: null
    };
  },

  computed: {
    ...mapGetters({
      holesAllIds: "shape/getHolesAllIds"
    })
  },

  methods: {
    ...mapActions({
      holeEditOpen: `holeEdit/${HOLE_EDIT_OPEN}`,
      holeEditClose: `holeEdit/${HOLE_EDIT_CLOSE}`,
      addHole: `shape/${ADD_HOLE}`
    }),
    handleAddHoleClick() {
      this.addHole().then(({ id }) => {
        this.editHole(id);
      });
    },
    editHole(id) {
      this.holeId = id;
      this.holeEditOpen({ id });
    }
  }
};
</script>
