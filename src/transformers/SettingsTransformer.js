import Transformer from "./Transformer";

export default class SettingsTransformer extends Transformer {
  constructor(settigns) {
    super();
    this.settigns = settigns;
  }

  getCutTypes() {
    return this.settigns.cutTypes || {};
  }

  getCutMaterials() {
    return this.settigns.cutMaterials || {};
  }
}
