import generateId from "./generateId";

jest.mock("nanoid/generate", () => () => "mockedUID");

describe("`generateId` helper", () => {
  it("should return id", () => {
    expect(generateId()).toEqual("mockedUID");
  });
});
