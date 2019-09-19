import { shallowMount } from "@vue/test-utils";
import { SvgText } from "@/components";

describe("<SvgText /> component", () => {
  const slots = {
    default: "Test text"
  };

  it("should render correct without props", () => {
    const wrapper = shallowMount(SvgText, { slots });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
