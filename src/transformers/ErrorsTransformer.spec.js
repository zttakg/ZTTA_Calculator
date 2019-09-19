import ErrorsTransformer from "./ErrorsTransformer";

describe("ErrorsTransformer", () => {
  const mockedErrors = [
    {
      source: "title",
      type: "validation",
      message: "can't be blank",
      description: ""
    },
    {
      source: "title",
      type: "validation",
      message: "is too short",
      description: ""
    },
    {
      source: "quantity",
      type: "validation",
      message: "must be greater than 0",
      description: ""
    },
    {
      source: "",
      type: "critical",
      message: "Error text",
      description: ""
    }
  ];

  describe("constructor", () => {
    it("should create instance with new", () => {
      const e = new ErrorsTransformer(mockedErrors);
      expect(e.errors).toBe(mockedErrors);
    });

    it("should get critical errors", () => {
      const e = new ErrorsTransformer(mockedErrors);
      expect(e.getCritical()).toEqual([
        {
          source: "",
          type: "critical",
          message: "Error text",
          description: ""
        }
      ]);
    });

    it("should get validation errors", () => {
      const e = new ErrorsTransformer(mockedErrors);
      expect(e.getValidation()).toEqual({
        title: [
          {
            source: "title",
            type: "validation",
            message: "can't be blank",
            description: ""
          },
          {
            source: "title",
            type: "validation",
            message: "is too short",
            description: ""
          }
        ],
        quantity: [
          {
            source: "quantity",
            type: "validation",
            message: "must be greater than 0",
            description: ""
          }
        ]
      });
    });
  });
});
