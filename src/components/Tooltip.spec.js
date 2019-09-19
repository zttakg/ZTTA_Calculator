import { shallowMount } from "@vue/test-utils";
import { Tooltip } from "@/components";

describe("<Tooltip /> component", () => {
  const slots = {
    default: "Tooltip content"
  };

  it("should render correct without props", () => {
    const wrapper = shallowMount(Tooltip);

    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should render all props", () => {
    const wrapper = shallowMount(Tooltip, {
      propsData: {
        open: true,
        arrow: true,
        theme: "material dark shadow"
      },
      slots
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
