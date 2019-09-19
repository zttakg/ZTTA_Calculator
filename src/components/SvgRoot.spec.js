import { shallowMount } from "@vue/test-utils";
import SvgRoot from "./SvgRoot";

describe("<SvgRoot /> component", () => {
  it("should render correct without props", () => {
    const wrapper = shallowMount(SvgRoot);

    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should render all props", () => {
    const wrapper = shallowMount(SvgRoot, {
      propsData: {
        width: 100,
        height: 200,
        viewBox: "0 0 500 800"
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
