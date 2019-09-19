import { createElement } from "./util/createElement";
import NotificationItem from "./NotificationItem";

class Notification {
  constructor(options = {}) {
    // List of notifications currently active
    this.notifications = [];

    this.name = "notification";

    this.defaults = {
      delay: 3000,
      containerClassName: "notification-container",
      containerItemClassName: "notification-container__item"
    };

    this.options = Object.assign({}, this.defaults, options);

    this.init();
  }

  init() {
    this.container = this.createNotificationContainer();
  }

  createNotificationContainer() {
    const notificationContainer = createElement("div", {
      className: this.options.containerClassName
    });
    document.body.appendChild(notificationContainer);

    return notificationContainer;
  }

  close(notification) {
    notification.hide();

    const index = this.notifications.indexOf(notification);
    this.notifications.splice(index, 1);
  }

  show(message, _options) {
    const options = {
      delay: this.options.delay,
      ..._options
    };

    const notification = new NotificationItem(this.container);
    const item = notification.show(message, {
      ...options,
      className: `${options.className} ${this.options.containerItemClassName}`
    });

    this.container.appendChild(item);
    this.notifications.push(item);

    setTimeout(() => {
      this.close(notification);
    }, options.delay);
  }
}

export default Notification;
