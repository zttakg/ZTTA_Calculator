import arrayToObject from "./arrayToObject";

describe("arrayToObject", () => {
  it("should return keyed object", () => {
    const mockData = [
      {
        id: 1,
        type: "user",
        name: "John Doe"
      },
      {
        id: 2,
        type: "user",
        name: "John Wick"
      },
      {
        id: "666",
        type: "user",
        name: "HIS NAME IS JOHN CENA!!!"
      }
    ];

    const expected = {
      1: {
        id: 1,
        type: "user",
        name: "John Doe"
      },
      2: {
        id: 2,
        type: "user",
        name: "John Wick"
      },
      666: {
        id: "666",
        type: "user",
        name: "HIS NAME IS JOHN CENA!!!"
      }
    };

    expect(arrayToObject(mockData)).toEqual(expected);
  });
});
