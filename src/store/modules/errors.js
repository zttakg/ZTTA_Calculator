import Vue from "vue";
import { getField, updateField } from "vuex-map-fields";
import {
  SET_VALIDATION_ERRORS,
  SET_CRITICAL_ERRORS
} from "@/store/mutation-types";
import { SET_ERRORS, SHOW_CRITICAL_ERROR } from "@/store/action-types";
import { CRITICAL_ERROR_DELAY } from "@/constants";

import ErrorsTransformer from "@/transformers/ErrorsTransformer";

const mutations = {
  updateField,
  [SET_VALIDATION_ERRORS](state, validation) {
    state.validation = validation;
  },
  [SET_CRITICAL_ERRORS](state, critical) {
    state.critical = critical;
  }
};

const getters = {
  getField
};

const actions = {
  [SET_ERRORS]({ commit, dispatch }, errors) {
    if (errors) {
      const error = new ErrorsTransformer(errors);
      const critical = error.getCritical();

      commit(SET_VALIDATION_ERRORS, error.getValidation());
      commit(SET_CRITICAL_ERRORS, critical);

      if (critical.length > 0) {
        dispatch(SHOW_CRITICAL_ERROR);
      }
    }
  },
  [SHOW_CRITICAL_ERROR]({ state, commit }) {
    const delay = CRITICAL_ERROR_DELAY;

    state.critical.forEach((error, index) => {
      Vue.notification.show(error.message, {
        className: "notification_type_error",
        delay,
        afterClose() {
          const critical = state.critical.filter((el, i) => i !== index);
          commit(SET_CRITICAL_ERRORS, critical);
        }
      });
    });
  }
};

const state = () => ({
  validation: {},
  critical: []
});

export default {
  namespaced: true,

  state,
  mutations,
  getters,
  actions
};
