import Vue from "vue";
import { getField, updateField } from "vuex-map-fields";
import {
  PUSH_HOLE,
  UPDATE_HOLE,
  REMOVE_HOLE,
  SET_SHAPE_STATE
} from "@/store/mutation-types";
import {
  ADD_HOLE,
  SAVE_SHAPE,
  SET_ERRORS,
  CALCULATE_COST,
  ADD_TO_CART,
  LOAD_SHAPE,
  UPDATE_SHAPE,
  LOAD_SHAPE_ORDER,
  UPDATE_SHAPE_ORDER,
  SHOW_FATAL_ERROR,
  SHOW_RESPONCE_ERRORS
} from "@/store/action-types";
import {
  NOTIFICATION_DELAY,
  SHAPE_SUCCESS_SAVE_MESSAGE,
  SHAPE_ORDER_SUCCESS_SAVE_MESSAGE
} from "@/constants";
import uid from "@/helpers/generateId";
import ConstructorProxy from "@/proxies/ConstructorProxy";
import OrderProxy from "@/proxies/OrderProxy";

const createHole = id => ({
  id,
  type: "circle", // ["circle", "rectangle"]
  position: {
    zeroPoint: {
      // ["top-left", "top-right", "bottom-left", "bottom-right"]
      // ["center", "side"]`
      rectangle: "top-left",
      triangle: "bottom-left",
      circle: "center",
      hole: "center" // or side
    },
    x: "50",
    y: "50",
    l: "0",
    angle: "0"
  },
  width: "40",
  height: "40",
  radius: "0",
  diameter: "40",
  isHovered: false
});

const mutations = {
  updateField,
  [PUSH_HOLE](state, hole) {
    Vue.set(state.holes, hole.id, hole);
  },
  [REMOVE_HOLE](state, id) {
    Vue.delete(state.holes, id);
  },
  [UPDATE_HOLE](state, { id, data }) {
    Vue.set(state.holes, id, data);
  }
};

const actions = {
  [SHOW_FATAL_ERROR]({ dispatch }, error) {
    return dispatch(
      `errors/${SET_ERRORS}`,
      [{ type: "critical", message: error.message }],
      { root: true }
    );
  },
  [SHOW_RESPONCE_ERRORS]({ dispatch }, responce) {
    if (responce.errors) {
      return dispatch(`errors/${SET_ERRORS}`, responce.errors, {
        root: true
      });
    }
    return responce;
  },
  [ADD_HOLE]({ commit }) {
    const id = `_${uid()}`;
    const hole = createHole(id);
    commit(PUSH_HOLE, hole);
    return hole;
  },
  [SAVE_SHAPE]({ dispatch, state }) {
    return new ConstructorProxy()
      .save(state)
      .then(
        data => {
          if (data.shape) {
            const id = parseInt(data.shape.id, 10);

            if (id) {
              Vue.router.push(`/edit/${id}`);

              Vue.notification.show(SHAPE_SUCCESS_SAVE_MESSAGE, {
                className: "notification_type_success",
                delay: NOTIFICATION_DELAY
              });
            }
          }

          return data;
        },
        responce => dispatch("SHOW_RESPONCE_ERRORS", responce)
      )
      .catch(error => dispatch("SHOW_FATAL_ERROR", error));
  },
  [UPDATE_SHAPE]({ dispatch, state }, id) {
    return new ConstructorProxy()
      .update(id, state)
      .then(
        data => {
          if (data.shape) {
            Vue.notification.show(SHAPE_SUCCESS_SAVE_MESSAGE, {
              className: "notification_type_success",
              delay: NOTIFICATION_DELAY
            });
          }

          return data;
        },
        responce => dispatch("SHOW_RESPONCE_ERRORS", responce)
      )
      .catch(error => dispatch("SHOW_FATAL_ERROR", error));
  },
  [CALCULATE_COST]({ dispatch, state }) {
    return new ConstructorProxy()
      .cost(state)
      .then(
        data => data,
        responce => dispatch("SHOW_RESPONCE_ERRORS", responce)
      )
      .catch(error => dispatch("SHOW_FATAL_ERROR", error));
  },
  [ADD_TO_CART]({ dispatch, state }) {
    return new ConstructorProxy()
      .addToCart(state)
      .then(
        data => {
          if (data.success && data.success.redirectTo) {
            window.location.href = "";
            window.location = data.success.redirectTo;
          }

          return data;
        },
        responce => dispatch("SHOW_RESPONCE_ERRORS", responce)
      )
      .catch(error => dispatch("SHOW_FATAL_ERROR", error));
  },
  [LOAD_SHAPE]({ dispatch, commit }, id) {
    return new ConstructorProxy()
      .getById(id)
      .then(
        data => {
          if (data.shape) {
            commit(SET_SHAPE_STATE, data.shape, { root: true });
          }
          return data;
        },
        responce => dispatch("SHOW_RESPONCE_ERRORS", responce)
      )
      .catch(error => dispatch("SHOW_FATAL_ERROR", error));
  },
  [LOAD_SHAPE_ORDER]({ dispatch, commit }, id) {
    return new OrderProxy()
      .getById(id)
      .then(
        data => {
          if (data.shape) {
            commit(SET_SHAPE_STATE, data.shape, { root: true });
          }
          return data;
        },
        responce => dispatch("SHOW_RESPONCE_ERRORS", responce)
      )
      .catch(error => dispatch("SHOW_FATAL_ERROR", error));
  },
  [UPDATE_SHAPE_ORDER]({ dispatch, state }, id) {
    return new OrderProxy()
      .update(id, state)
      .then(
        data => {
          if (data.shape) {
            Vue.notification.show(SHAPE_ORDER_SUCCESS_SAVE_MESSAGE, {
              className: "notification_type_success",
              delay: NOTIFICATION_DELAY
            });
          }

          return data;
        },
        responce => dispatch("SHOW_RESPONCE_ERRORS", responce)
      )
      .catch(error => dispatch("SHOW_FATAL_ERROR", error));
  }
};

const getters = {
  getField,
  shape: state => state[state.type],
  isHaveHoles: state => Object.keys(state.holes).length > 0,
  getHoleById: state => id => state.holes[id],
  getHolesAllIds: state => Object.keys(state.holes),
  isRectangle: state => state.type === "rectangle",
  isCircle: state => state.type === "circle",
  isTriangle: state => state.type === "triangle"
};

const state = () => ({
  type: "rectangle",
  title: "Закладная 1",
  material: "",
  cutType: "",
  quantity: 1,
  circle: {
    diameter: "300"
  },
  rectangle: {
    width: "300",
    height: "300",
    radius: "0"
  },
  triangle: {
    side1: "300",
    side2: "300"
  },
  holes: {
    /*
    id: {
      id,
      type,
      position: {
        zeroPoint: {
          outer,
          inner
        },
        x,
        y
      },
      width,
      height,
      radius,
      diameter
    }
    */
  }
});

export default {
  namespaced: true,

  state,
  mutations,
  getters,
  actions
};
