import { shallowMount } from "@vue/test-utils";
import ButtonGroup from "./ButtonGroup";

describe("<ButtonGroup /> component", () => {
  const slots = {
    default: [
      '<button type="button" class="button"></button>',
      '<button type="button" class="button"></button>'
    ]
  };

  it("should render correct without props", () => {
    const wrapper = shallowMount(ButtonGroup, {
      slots
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
