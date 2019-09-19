import groupBy from "@/helpers/groupBy";

import Transformer from "./Transformer";

export default class ErrorsTransformer extends Transformer {
  constructor(errors = []) {
    super();
    this.errors = errors;
  }

  byType() {
    return groupBy(this.errors, "type");
  }

  getCritical() {
    return this.byType().critical || [];
  }

  getValidation() {
    return groupBy(this.byType().validation, "source") || {};
  }
}
