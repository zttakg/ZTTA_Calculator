import groupBy from "./groupBy";

describe("groupBy", () => {
  it("should return keyed object", () => {
    const mockData = [
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
        description: "The password provided is missing a punctuation character."
      },
      {
        source: "",
        type: "critical",
        message: "Error text",
        description: ""
      }
    ];

    const expected = {
      validation: [
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
          description:
            "The password provided is missing a punctuation character."
        }
      ],
      critical: [
        {
          source: "",
          type: "critical",
          message: "Error text",
          description: ""
        }
      ]
    };
    const expected2 = {
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
          description:
            "The password provided is missing a punctuation character."
        }
      ],
      "": [
        {
          source: "",
          type: "critical",
          message: "Error text",
          description: ""
        }
      ]
    };

    expect(groupBy(mockData, "type")).toEqual(expected);
    expect(groupBy(mockData, "source")).toEqual(expected2);
  });
});
