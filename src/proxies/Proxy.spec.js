import BaseProxy from "./Proxy";

describe("BaseProxy", () => {
  const endpoint = "/api/test/endpoint";

  it("should map `endpoint` and `parameters` in constructor", () => {
    const parameters = { test: true };
    const proxy = new BaseProxy(endpoint, parameters);

    expect(proxy.endpoint).toEqual(endpoint);
    expect(proxy.parameters).toEqual(parameters);
  });

  it("setParameters method", () => {
    const proxy = new BaseProxy(endpoint);
    const parameters = { test: true };

    expect(proxy.parameters).toEqual({});
    proxy.setParameters(parameters);
    expect(proxy.parameters).toEqual(parameters);
  });

  it("setParameter method", () => {
    const proxy = new BaseProxy(endpoint);
    expect(proxy.parameters).toEqual({});
    proxy.setParameter("test", true);
    expect(proxy.parameters).toEqual({ test: true });
  });

  it("removeParameters method", () => {
    const parameters = {
      test: true,
      name: "John",
      age: "22"
    };
    const proxy = new BaseProxy(endpoint, parameters);

    expect(proxy.parameters).toEqual(parameters);
    proxy.removeParameters(["test", "name"]);
    expect(proxy.parameters).toEqual({ age: "22" });
  });

  it("removeParameter method", () => {
    const parameters = {
      test: true,
      name: "John",
      age: "22"
    };
    const proxy = new BaseProxy(endpoint, parameters);

    expect(proxy.parameters).toEqual(parameters);
    proxy.removeParameter("age");
    expect(proxy.parameters).toEqual({
      test: true,
      name: "John"
    });
  });
});
