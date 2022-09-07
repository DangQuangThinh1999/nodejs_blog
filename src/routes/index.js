const newsRouter = require("./news");
const siteRouter = require("./site");
const courseRouter = require("./courses");
const meRouter = require("./me");
const userRouter = require("./user");

function route(app) {
  app.use("/news", newsRouter);
  app.use("/courses", courseRouter);
  app.use("/", siteRouter);
  app.use("/me", meRouter);
  app.use("/user", userRouter);
}

module.exports = route;
