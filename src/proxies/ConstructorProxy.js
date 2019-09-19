import Proxy from "./Proxy";

export default class ConstructorProxy extends Proxy {
  constructor(parameters = {}) {
    super("constructor", parameters);
  }

  save(shape) {
    return this.submit("post", `${this.endpoint}/save`, { shape });
  }

  cost(shape) {
    return this.submit("post", `${this.endpoint}/cost`, { shape });
  }

  addToCart(shape) {
    return this.submit("post", `${this.endpoint}/add_to_cart`, { shape });
  }

  getById(id) {
    return this.submit("get", `${this.endpoint}/shape/${id}`);
  }

  update(id, shape) {
    return this.submit("put", `${this.endpoint}/shape/${id}`, { shape });
  }
}
