import { mount } from "@vue/test-utils";
import SvgTriangle from "./SvgTriangle";

describe("<SvgTriangle /> component", () => {
  it("should render correct without props", () => {
    const wrapper = mount(SvgTriangle);

    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should render all props", () => {
    const wrapper = mount(SvgTriangle, {
      propsData: {
        side1: "200",
        side2: "400",
        fillColor: "#000"
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
