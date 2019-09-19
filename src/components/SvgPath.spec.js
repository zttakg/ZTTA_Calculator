import { shallowMount } from "@vue/test-utils";
import SvgPath from "./SvgPath";

describe("<SvgPath /> component", () => {
  it("should render correct without props", () => {
    const wrapper = shallowMount(SvgPath);

    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should render all props", () => {
    const wrapper = shallowMount(SvgPath, {
      propsData: {
        path: "M10 10 H 90 V 90 H 10 L 10 10",
        strokeWidth: 5,
        strokeLinecap: "butt",
        strokeColor: "#f06",
        fillColor: "red"
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
