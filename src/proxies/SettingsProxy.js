import Proxy from "./Proxy";

export default class SettingsProxy extends Proxy {
  constructor(parameters = {}) {
    super("/constructor/info", parameters);
  }

  load() {
    return this.submit("get", this.endpoint);
  }
}
