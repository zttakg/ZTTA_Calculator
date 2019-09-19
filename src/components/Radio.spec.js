import { shallowMount } from "@vue/test-utils";

import Radio from "./Radio";

jest.mock("../helpers/generateId", () => () => "mockedUID");

describe("<Radio /> component", () => {
  it("should render correct without props", () => {
    const wrapper = shallowMount(Radio);

    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should render all props", () => {
    const wrapper = shallowMount(Radio, {
      propsData: {
        id: "test-id",
        name: "test-name",
        value: "",
        className: "test-class",
        theme: "test-theme",
        label: "Test label",
        checked: true,
        required: true,
        disabled: true,
        labelHidden: true
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
