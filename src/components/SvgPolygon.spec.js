import { shallowMount } from "@vue/test-utils";
import SvgPolygon from "./SvgPolygon";

describe("<SvgPolygon /> component", () => {
  it("should render correct without props", () => {
    const wrapper = shallowMount(SvgPolygon);

    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should render all props", () => {
    const wrapper = shallowMount(SvgPolygon, {
      propsData: {
        points: "100 0, 0 200, 200 200, 100 0",
        strokeWidth: 5,
        strokeColor: "#000",
        fillColor: "#000"
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
