import Proxy from "./Proxy";

export default class OrderProxy extends Proxy {
  constructor(parameters = {}) {
    super("constructor", parameters);
  }

  getById(id) {
    return this.submit("get", `${this.endpoint}/order_shape/${id}`);
  }

  update(id, shape) {
    return this.submit("put", `${this.endpoint}/order_shape/${id}`, { shape });
  }
}
