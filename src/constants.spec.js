import {
  SHAPE_STYLE,
  HOLE_COLOR,
  DIMENSION_LINE_OFFSET,
  DIMENSION_LINE_COLOR,
  DIMENSION_LINE_TEXT_STYLE,
  ARROW_TEMPLATE,
  ARROW_SIZE
} from "./constants";

describe("App constants", () => {
  it("should have `SHAPE_STYLE`", () => {
    expect(typeof SHAPE_STYLE).toBe("string");
    expect(SHAPE_STYLE.length > 0).toBe(true);
  });

  it("should have `HOLE_COLOR`", () => {
    expect(typeof HOLE_COLOR).toBe("string");
    expect(HOLE_COLOR.length > 0).toBe(true);
  });

  it("should have `DIMENSION_LINE_OFFSET`", () => {
    expect(typeof DIMENSION_LINE_OFFSET).toBe("number");
    expect(DIMENSION_LINE_OFFSET > 0).toBe(true);
  });

  it("should have `DIMENSION_LINE_COLOR`", () => {
    expect(typeof DIMENSION_LINE_COLOR).toBe("string");
    expect(DIMENSION_LINE_COLOR.length > 0).toBe(true);
  });

  it("should have `DIMENSION_LINE_TEXT_STYLE`", () => {
    expect(typeof DIMENSION_LINE_TEXT_STYLE).toBe("string");
    expect(DIMENSION_LINE_TEXT_STYLE.length > 0).toBe(true);
  });

  it("should have `ARROW_TEMPLATE`", () => {
    expect(Array.isArray(ARROW_TEMPLATE)).toBe(true);
    expect(ARROW_TEMPLATE.length > 0).toBe(true);
  });

  it("should have `ARROW_SIZE`", () => {
    expect(typeof ARROW_SIZE).toBe("number");
    expect(ARROW_SIZE > 0).toBe(true);
  });
});
