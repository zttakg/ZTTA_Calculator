import { shallowMount } from "@vue/test-utils";
import Input from "./Input";
import Icon from "./Icon";

describe("<Input /> component", () => {
  it("should render correct without props", () => {
    const wrapper = shallowMount(Input);

    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should render all props", () => {
    const wrapper = shallowMount(Input, {
      propsData: {
        value: "100",
        name: "test-name",
        type: "number",
        theme: "material rounded",
        placeholder: "test placeholder",
        block: true,
        icon: "test",
        min: 10,
        max: 1000
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should render <Icon />", () => {
    const icon = "test";
    const wrapper = shallowMount(Input, {
      propsData: {
        icon
      }
    });
    const iconEl = wrapper.find(Icon);

    expect(iconEl.props().name).toEqual(icon);
  });
});
