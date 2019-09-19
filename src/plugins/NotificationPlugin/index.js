import NotificationPlugin from "./Notification";

const Notification = {
  install: (Vue, options) => {
    const notification = new NotificationPlugin(options);
    /* eslint-disable no-param-reassign */
    Vue.prototype.$notification = notification;
    Vue.notification = notification;
    /* eslint-enable no-param-reassign */
  }
};

// register plugin if it is used via cdn or directly as a script tag
if (typeof window !== "undefined" && window.Vue) {
  window.Notification = Notification;
}

export default Notification;
