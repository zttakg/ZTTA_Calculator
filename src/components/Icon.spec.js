import { shallowMount } from "@vue/test-utils";
import { Icon } from "@/components";

jest.mock("@/constants", () => ({
  SVG_ICONS_SPRITE_PATH: "path/to/sprite.svg"
}));

describe("<Icon /> component", () => {
  it("should render correct without props", () => {
    const wrapper = shallowMount(Icon);

    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should render all props", () => {
    const wrapper = shallowMount(Icon, {
      propsData: {
        name: "test",
        title: "Test icon"
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
