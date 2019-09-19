import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";

import App from "./App";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("<App /> component", () => {
  it("should render correct without props", () => {
    const store = new Vuex.Store({
      state: {}
    });

    const wrapper = shallowMount(App, {
      store,
      localVue,
      stubs: {
        "router-view": true
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
