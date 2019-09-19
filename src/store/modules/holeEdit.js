import { getField, updateField } from "vuex-map-fields";
import {
  HOLE_EDIT_SHOW,
  HOLE_EDIT_HIDE,
  HOLE_EDIT_SET_PARAMS
} from "@/store/mutation-types";

import { HOLE_EDIT_OPEN, HOLE_EDIT_CLOSE } from "@/store/action-types";

const mutations = {
  updateField,
  [HOLE_EDIT_SHOW](state) {
    state.visible = true;
  },
  [HOLE_EDIT_HIDE](state) {
    state.visible = false;
  },
  [HOLE_EDIT_SET_PARAMS](state, params) {
    state.params = params;
  }
};

const getters = {
  getField
};

const actions = {
  [HOLE_EDIT_OPEN]({ commit }, params) {
    commit(HOLE_EDIT_SET_PARAMS, params);
    commit(HOLE_EDIT_SHOW);
  },
  [HOLE_EDIT_CLOSE]({ commit }) {
    commit(HOLE_EDIT_HIDE);
    commit(HOLE_EDIT_SET_PARAMS, {});
  }
};

const state = () => ({
  visible: false,
  params: {}
});

export default {
  namespaced: true,

  state,
  mutations,
  getters,
  actions
};
