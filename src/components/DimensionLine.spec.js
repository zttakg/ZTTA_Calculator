import { shallowMount } from "@vue/test-utils";
import { SvgLine, SvgArrow } from "@/components";
import DimensionLine from "./DimensionLine";

describe("<DimensionLine /> component", () => {
  it("should render correct without props", () => {
    const wrapper = shallowMount(DimensionLine);
    const lines = wrapper.findAll(SvgLine);
    const line1 = lines.at(0);
    const line2 = lines.at(1);
    const arrow = wrapper.find(SvgArrow);

    expect(line1.exists()).toEqual(true);
    expect(line1.props().from).toEqual([1, 301]);
    expect(line1.props().to).toEqual([1, 349]);

    expect(line2.exists()).toEqual(true);
    expect(line2.props().from).toEqual([301, 301]);
    expect(line2.props().to).toEqual([301, 349]);

    expect(arrow.exists()).toEqual(true);
    expect(arrow.props().orientation).toEqual("horizontal");
    expect(arrow.props().width).toEqual("300");
    expect(arrow.props().height).toEqual("300");
  });

  it("should render all props", () => {
    const orientation = "vertical";
    const width = "100";
    const height = "200";
    const radius = "30";
    const wrapper = shallowMount(DimensionLine, {
      propsData: {
        orientation,
        width,
        height,
        radius
      }
    });
    const lines = wrapper.findAll(SvgLine);
    const line1 = lines.at(0);
    const line2 = lines.at(1);
    const arrow = wrapper.find(SvgArrow);

    expect(line1.exists()).toEqual(true);
    expect(line1.props().from).toEqual([71, 1]);
    expect(line1.props().to).toEqual([149, 1]);

    expect(line2.exists()).toEqual(true);
    expect(line2.props().from).toEqual([71, 201]);
    expect(line2.props().to).toEqual([148, 201]);

    expect(arrow.exists()).toEqual(true);
    expect(arrow.props().orientation).toEqual(orientation);
    expect(arrow.props().width).toEqual(width);
    expect(arrow.props().height).toEqual(height);
  });
});
