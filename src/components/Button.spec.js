import { shallowMount } from "@vue/test-utils";
import Button from "./Button";

describe("<Button /> component", () => {
  it("should render correct without props", () => {
    const wrapper = shallowMount(Button);

    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should render all props as link", () => {
    const wrapper = shallowMount(Button, {
      propsData: {
        to: "#",
        type: "submit",
        color: "blue",
        size: "xxxl",
        theme: "solid rounded",
        block: true,
        disabled: true,
        icon: true
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should render all props as button", () => {
    const wrapper = shallowMount(Button, {
      propsData: {
        type: "submit",
        color: "blue",
        size: "xxxl",
        theme: "solid rounded",
        block: true,
        disabled: true,
        icon: true
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
