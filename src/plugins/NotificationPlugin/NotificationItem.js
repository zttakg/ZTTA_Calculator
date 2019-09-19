import { createElement } from "./util/createElement";
import { animationEndEventName } from "./util/aninmation";

class NotificationItem {
  constructor(container) {
    this.name = "notificationItem";
    this.container = container;

    this.defaults = {
      delay: 3000,
      close: true,
      className: "",
      containerClassName: "notification",
      disappearClassName: "notification_disappear",
      closeClassName: "notification__close",
      messageClassName: "notification__message",
      afterClose() {}
    };

    this.options = Object.assign({}, this.defaults);

    this.init();
  }

  init() {
    this.animationEnd = animationEndEventName();
  }

  build(message, options) {
    let close = null;

    if (options.close) {
      close = createElement("button", {
        className: this.defaults.closeClassName,
        type: "button"
      });
    }

    const notification = createElement(
      "div",
      { className: `${this.defaults.containerClassName} ${options.className}` },
      close,
      createElement(
        "div",
        { className: this.defaults.messageClassName },
        message
      )
    );

    this.notification = notification;

    if (close) {
      close.addEventListener("click", () => {
        this.hide();
      });
    }

    return notification;
  }

  callback(name) {
    const cb = this.options[name];

    if (typeof cb === "function") {
      cb.call(this.element);
    }
  }

  show(message, _options) {
    const options = {
      ...this.defaults,
      ..._options
    };

    this.options = options;

    const item = this.build(message, options);

    this.element = item;

    return item;
  }

  hide() {
    const plugin = this;

    this.element.classList.add(this.defaults.disappearClassName);

    this.element.addEventListener(this.animationEnd, event => {
      if (event.target === this.element) {
        this.container.removeChild(this.element);
        plugin.callback("afterClose");
      }
    });
  }
}

export default NotificationItem;
