import { shallowMount } from "@vue/test-utils";
import { FormItem } from "@/components";

describe("<FormItem /> component", () => {
  const slots = {
    default:
      "<input type='text' value='test-value' name='test-name' id='test-id' />"
  };

  it("should render correct without props", () => {
    const wrapper = shallowMount(FormItem);

    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should render all props", () => {
    const wrapper = shallowMount(FormItem, {
      propsData: {
        label: "Test label: <span>*</span>",
        "label-position": "left",
        errors: [
          { message: "Error message 1" },
          { message: "Error message 2" },
          { message: "Error message 3" }
        ]
      },
      slots
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should render with for `prop`", () => {
    const wrapper = shallowMount(FormItem, {
      propsData: {
        label: "Test label: <span>*</span>",
        "label-position": "left",
        htmlFor: "test-id",
        theme: "material bordered"
      },
      slots
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
