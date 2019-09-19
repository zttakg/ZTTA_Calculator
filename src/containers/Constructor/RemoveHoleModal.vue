<template>
  <Modal name="deleteHole">
    <Dialog
      name="deleteHole"
      title="Удалить отверстие?"
      :close="closeModal"
    >

      <p>Вы действительно хотите удалить отверстие?</p>

      <template slot="footer">
        <Button
          color="gray"
          size="m"
          theme="solid rounded"
          @click="closeModal"
        >
          Отмена
        </Button>
        &nbsp;
        <Button
          color="orange"
          size="m"
          theme="solid rounded"
          @click="onDelete"
        >
          Удалить
        </Button>
      </template>
    </Dialog>
  </Modal>
</template>

<script>
import { mapMutations, mapActions, mapState } from "vuex";
import { POP, Modal } from "vuex-modal";

import { Button, Dialog } from "@/components";

import { REMOVE_HOLE } from "@/store/mutation-types";
import { HOLE_EDIT_CLOSE } from "@/store/action-types";

export default {
  name: "ConstructorRemoveHoleModal",

  components: {
    Modal,
    Dialog,
    Button
  },

  computed: {
    ...mapState({
      modals: state => state.modal.stack || []
    }),
    holeId() {
      return this.modals.find(item => item.name === "deleteHole").holeId;
    }
  },

  methods: {
    ...mapMutations({
      REMOVE_HOLE: `shape/${REMOVE_HOLE}`
    }),
    ...mapActions({
      holeEditClose: `holeEdit/${HOLE_EDIT_CLOSE}`,
      closeModal: POP
    }),
    onDelete() {
      this.REMOVE_HOLE(this.holeId);
      this.closeModal({ name: "deleteHole" });
    }
  }
};
</script>
