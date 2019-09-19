import parseUnit from "./parseUnit";

describe("`parseUnit` helper", () => {
  it("should correct parse units", () => {
    expect(parseUnit(1)).toEqual({
      value: 1,
      unit: undefined
    });

    expect(parseUnit("10")).toEqual({
      value: 10,
      unit: undefined
    });

    expect(parseUnit("100px")).toEqual({
      value: 100,
      unit: "px"
    });

    expect(parseUnit("1000rem")).toEqual({
      value: 1000,
      unit: "rem"
    });

    expect(parseUnit("20%")).toEqual({
      value: 20,
      unit: "%"
    });

    expect(parseUnit("30fr")).toEqual({
      value: 30,
      unit: "fr"
    });

    expect(parseUnit("40someTestUnit test text")).toEqual({
      value: 40,
      unit: "someTestUnit"
    });

    expect(parseUnit("notUnit")).toEqual({
      value: 0,
      unit: undefined
    });

    expect(parseUnit("-1000px")).toEqual({
      value: -1000,
      unit: "px"
    });
  });
});
