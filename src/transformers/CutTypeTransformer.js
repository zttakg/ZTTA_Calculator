import Transformer from "./Transformer";

export default class CutTypeTransformer extends Transformer {
  constructor(cutTypes) {
    super();
    this.cutTypes = cutTypes;
  }

  getOptionsList() {
    return this.cutTypes.map(({ name }) => ({
      label: name,
      value: name
    }));
  }

  getCutMaterialsIds(name = "") {
    return this.cutTypes.find(item => item.name === name).cutMaterialIds || [];
  }
}
