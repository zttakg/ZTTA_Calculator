import { shallowMount } from "@vue/test-utils";
import { Dialog } from "@/components";

describe("<Dialog /> component", () => {
  it("should render correct without props", () => {
    const wrapper = shallowMount(Dialog);
    const header = wrapper.find(".dialog__header");

    expect(wrapper.html()).toMatchSnapshot();
    expect(header.exists()).toEqual(false);
  });

  it("should render all props", () => {
    const wrapper = shallowMount(Dialog, {
      propsData: {
        name: "test",
        title: "Test dialog title",
        close() {},
        theme: "full-screen bordered test"
      },
      slots: {
        default: "<p>Test conetent</p>",
        footer: "<p>Test footer</p>"
      },
      stubs: {
        Button: {
          render(h) {
            return h("button", this.$slots.default);
          }
        }
      }
    });
    const header = wrapper.find(".dialog__header");
    const title = header.find(".dialog__title");
    const close = header.find(".dialog__close");

    expect(wrapper.html()).toMatchSnapshot();
    expect(header.exists()).toEqual(true);
    expect(title.exists()).toEqual(true);
    expect(close.exists()).toEqual(true);
  });
});
