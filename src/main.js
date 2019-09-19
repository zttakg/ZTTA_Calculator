import Vue from "vue";

// Plugins
import "@/plugins/vuex";
import "@/plugins/axios";
import { router } from "@/plugins/vue-router";
import "@/plugins/vuex-router-sync";
import "@/plugins/notification";
import "@/plugins/click-outside";
import "@/plugins/filters";

// Styles
import "@/styles/common.styl";

// App
import App from "@/App";
import store from "@/store";
import { LOAD_SETTINGS } from "@/store/action-types";

Vue.config.productionTip = false;

store.dispatch(`settings/${LOAD_SETTINGS}`);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
