import { shallowMount } from "@vue/test-utils";
import SvgCircle from "./SvgCircle";

describe("<SvgCircle /> component", () => {
  it("should render correct without props", () => {
    const wrapper = shallowMount(SvgCircle);

    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should render circle using `diameter` prop", () => {
    const wrapper = shallowMount(SvgCircle, {
      propsData: {
        diameter: "100"
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should move using `cx` and `cy`", () => {
    const wrapper = shallowMount(SvgCircle, {
      propsData: {
        diameter: "100",
        cx: "10",
        cy: "20"
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should move using `cx`, `cy` and `strokeWidth` props", () => {
    const wrapper = shallowMount(SvgCircle, {
      propsData: {
        diameter: "100",
        cx: "10",
        cy: "20",
        strokeWidth: 5,
        strokeColor: "#000"
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should fill circle using `fillColor` prop", () => {
    const wrapper = shallowMount(SvgCircle, {
      propsData: {
        fillColor: "#000"
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
