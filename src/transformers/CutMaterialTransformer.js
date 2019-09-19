import Transformer from "./Transformer";

export default class CutMaterialTransformer extends Transformer {
  constructor(cutMaterials) {
    super();
    this.cutMaterials = cutMaterials;
  }

  getOptionsList(ids = []) {
    return ids.map(id => {
      const { name: label, id: value } = this.cutMaterials[id];
      return {
        label,
        value
      };
    });
  }

  getById(id) {
    return this.cutMaterials[id];
  }
}
