import { shallowMount } from "@vue/test-utils";
import { ARROW_TEMPLATE } from "@/constants";
import SvgArrow from "./SvgArrow";
import SvgLine from "./SvgLine";
import SvgPolygon from "./SvgPolygon";

describe("<SvgArrow /> component", () => {
  it("should render correct without props", () => {
    const wrapper = shallowMount(SvgArrow);
    const line = wrapper.find(SvgLine);
    const arrows = wrapper.findAll(SvgPolygon);
    const arrowPoints = ARROW_TEMPLATE.map(point => point.join(" ")).join(", ");

    expect(line.exists()).toEqual(true);
    expect(line.props().from).toEqual([0, 348]);
    expect(line.props().to).toEqual([300, 348]);

    expect(arrows.at(0).exists()).toEqual(true);
    expect(arrows.at(1).exists()).toEqual(true);
    expect(arrows.at(0).props().points).toEqual(arrowPoints);
  });

  it("should render all props", () => {
    const wrapper = shallowMount(SvgArrow, {
      propsData: {
        orientation: "vertical",
        width: "200",
        height: "400"
      }
    });
    const line = wrapper.find(SvgLine);
    const arrows = wrapper.findAll(SvgPolygon);
    const arrowPoints = ARROW_TEMPLATE.map(point => point.join(" ")).join(", ");

    expect(line.exists()).toEqual(true);
    expect(line.props().from).toEqual([248, 0]);
    expect(line.props().to).toEqual([248, 400]);

    expect(arrows.at(0).exists()).toEqual(true);
    expect(arrows.at(1).exists()).toEqual(true);
    expect(arrows.at(0).props().points).toEqual(arrowPoints);
  });
});
