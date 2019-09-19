import { shallowMount } from "@vue/test-utils";
import SvgRectangle from "./SvgRectangle";

describe("<SvgRectangle /> component", () => {
  it("should render correct without props", () => {
    const wrapper = shallowMount(SvgRectangle);

    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should render all props", () => {
    const wrapper = shallowMount(SvgRectangle, {
      propsData: {
        width: "200",
        height: "200",
        radius: "10",
        strokeWidth: 5,
        strokeColor: "#000",
        fillColor: "#000"
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should render `rx` and `ry` props manually", () => {
    const wrapper = shallowMount(SvgRectangle, {
      propsData: {
        rx: "20",
        ry: "10",
        radius: "100"
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
