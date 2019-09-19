import { shallowMount } from "@vue/test-utils";
import SvgLine from "./SvgLine";

describe("<SvgLine /> component", () => {
  it("should render correct without props", () => {
    const wrapper = shallowMount(SvgLine);

    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should render all props", () => {
    const wrapper = shallowMount(SvgLine, {
      propsData: {
        from: [40, 400],
        to: [20, 200],
        strokeWidth: 5,
        strokeLinecap: "butt",
        strokeColor: "#f06"
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
