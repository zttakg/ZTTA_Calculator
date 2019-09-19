import propTypes from "./propTypes";

describe("`propTypes` helper", () => {
  describe("`enum` emthod", () => {
    const mockData = ["one", "two", "three"];
    const validate = propTypes.enum(mockData);

    it("should return false", () => {
      expect(validate("four")).toEqual(false);
    });

    it("should return true", () => {
      expect(validate("two")).toEqual(true);
    });
  });
});
