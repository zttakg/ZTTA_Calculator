/*
 * Vuex Store
 * http://vuex.vuejs.org/en/index.html
 */

import Vuex from "vuex";
import { modalModule } from "vuex-modal";
import createLogger from "vuex/dist/logger";

// Modules
import shape from "./modules/shape";
import holeEdit from "./modules/holeEdit";
import settings from "./modules/settings";
import errors from "./modules/errors";

import { SET_SHAPE_STATE } from "./mutation-types";

const debug = process.env.NODE_ENV !== "production";

const store = new Vuex.Store({
  getters: {
    materialLimits(state) {
      return (
        state.settings.cutMaterials[state.shape.material] || {
          width: {
            max: 3000,
            min: 1
          },
          height: {
            max: 3000,
            min: 1
          },
          holeSize: {
            min: 1
          }
        }
      );
    }
  },

  mutations: {
    [SET_SHAPE_STATE](state, newState) {
      state.shape = newState;
    }
  },

  modules: {
    shape,
    holeEdit,
    settings,
    errors,
    modal: modalModule
  },

  strict: debug,
  plugins: debug ? [createLogger()] : []
});

if (debug) window.store = store;

export default store;
