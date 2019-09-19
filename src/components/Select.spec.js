import { shallowMount } from "@vue/test-utils";
import Select from "./Select";

describe("<Select /> component", () => {
  it("should render correct without props", () => {
    const wrapper = shallowMount(Select);

    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should render all props", () => {
    const wrapper = shallowMount(Select, {
      propsData: {
        value: "2",
        name: "test-name",
        theme: "material rounded",
        options: [
          {
            label: "Item 1",
            value: "1"
          },
          {
            label: "Item 2",
            value: "2"
          },
          {
            label: "Item 3",
            value: "3"
          }
        ],
        placeholder: "Please select ...",
        multiple: true,
        block: true,
        disabled: true
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should render with slot", () => {
    const wrapper = shallowMount(Select, {
      propsData: {
        value: "2",
        name: "test-name",
        theme: "material rounded",
        placeholder: "Please select ...",
        multiple: true,
        block: true,
        disabled: true
      },
      slots: {
        default: [
          {
            label: "Item 1",
            value: "1"
          },
          {
            label: "Item 2",
            value: "2"
          },
          {
            label: "Item 3",
            value: "3"
          }
        ].map(
          option => `<option value="${option.value}">${option.label}</option>`
        )
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
