import jsonServer from "json-server";

import routes from "./routes.json";

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

router.render = (req, res) => {
  // eslint-disable-next-line prefer-destructuring
  let data = res.locals.data;

  const random = Math.random() >= 0.5;

  const errors = {
    errors: [
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
        message: "Critical error message example",
        description: "Critical error description example"
      }
    ]
  };

  if (req.originalUrl === "/constructor/save" && req.method === "POST") {
    if (random) {
      res.status(422).jsonp(errors);
    } else {
      data = {
        shape: { id: 1 }
      };
    }
  }

  if (req.originalUrl === "/constructor/cost" && req.method === "POST") {
    if (random) {
      data = {
        cost: {
          price: "47579.09538",
          createDays: 7,
          shapeType: "rectangle",
          cutTypeTitle: "Газовая резка",
          materialTitle: "Сталь3 1.0 мм",
          count: 1,
          width: 200,
          height: 160,
          cutLength: 1280,
          area: 26800,
          mass: 68.34
        }
      };
    } else {
      res.status(422).jsonp(errors);
    }
  }

  if (req.originalUrl === "/constructor/add_to_cart" && req.method === "POST") {
    if (random) {
      data = {
        success: {
          redirectTo: "/cart"
        }
      };
    } else {
      res.status(422).jsonp({
        errors: [
          {
            source: "",
            type: "critical",
            message: "Critical error: Can't add to cart",
            description: "Critical error: Can't add to cart"
          }
        ]
      });
    }
  }

  if (/\/constructor\/shape/.test(req.originalUrl) && req.method === "GET") {
    console.log({ req: req.statusCode, res: res.statusCode });
    if (res.statusCode >= 300) {
      res.status(422).jsonp({
        errors: [
          {
            source: "",
            type: "critical",
            message: "Critical error: Not found",
            description: "Critical error: Not found"
          }
        ]
      });
    }
  }

  res.jsonp(data);
};

server.use(jsonServer.rewriter(routes));
server.use(middlewares);
server.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running");
});
