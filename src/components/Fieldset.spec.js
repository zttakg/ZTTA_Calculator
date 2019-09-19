import { shallowMount } from "@vue/test-utils";
import Fieldset from "./Fieldset";

describe("<Fieldset /> component", () => {
  const slots = {
    default: [
      "<input type='radio' name='test' id='r1' />",
      "<input type='radio' name='test' id='r2' />"
    ]
  };
  it("should render correct without props", () => {
    const wrapper = shallowMount(Fieldset, {
      slots
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should render all props", () => {
    const wrapper = shallowMount(Fieldset, {
      propsData: {
        legend: "Test"
      },
      slots
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should render with one child in default slot", () => {
    const wrapper = shallowMount(Fieldset, {
      propsData: {
        legend: "Test"
      },
      slots: {
        default: "<input type='radio' name='test' id='r1' />"
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should render without child in default slot", () => {
    const wrapper = shallowMount(Fieldset, {
      propsData: {
        legend: "Test"
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
