import { shallowMount } from "@vue/test-utils";
import MaterialIcon from "./MaterialIcon";

describe("<MaterialIcon /> component", () => {
  it("should render correct without props", () => {
    const wrapper = shallowMount(MaterialIcon);

    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should render all props", () => {
    const wrapper = shallowMount(MaterialIcon, {
      propsData: {
        name: "test",
        size: 48
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
