import { getField, updateField } from "vuex-map-fields";
import { SET_CUT_TYPES, SET_CUT_MATERIALS } from "@/store/mutation-types";
import { LOAD_SETTINGS } from "@/store/action-types";

import SettingsTransformer from "@/transformers/SettingsTransformer";
import SettingsProxy from "@/proxies/SettingsProxy";

const mutations = {
  updateField,
  [SET_CUT_TYPES](state, cutTypes) {
    state.cutTypes = cutTypes;
  },
  [SET_CUT_MATERIALS](state, cutMaterials) {
    state.cutMaterials = cutMaterials;
  }
};

const getters = {
  getField
};

const actions = {
  [LOAD_SETTINGS]({ commit }) {
    new SettingsProxy().load().then(data => {
      const settings = new SettingsTransformer(data);

      commit(SET_CUT_TYPES, settings.getCutTypes());
      commit(SET_CUT_MATERIALS, settings.getCutMaterials());
    });
  }
};

const state = () => ({
  cutTypes: [],
  cutMaterials: {}
});

export default {
  namespaced: true,

  state,
  mutations,
  getters,
  actions
};
