const express = require("express");
const path = require("path");
const morgan = require("morgan");
const { engine } = require("express-handlebars");
const route = require("./routes");
const methodOverride = require("method-override");
const db = require("../src/config/db/index");
const SortMiddleware = require("./app/middlewares/SortMiddleware");

// Connect DB
db.connect();
const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
const port = 3000;

//Customers middlewares
app.use(SortMiddleware);
//HTTP logger
// app.use(morgan("combined"));

// Config hbs
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b,
      sortable: (field, sort) => {
        const sortType = field === sort.column ? sort.type : "default";
        const icons = {
          default: "oi oi-elevator",
          asc: "oi oi-sort-ascending",
          desc: "oi oi-sort-descending",
        };
        const types = {
          default: "desc",
          desc: "asc",
          asc: "desc",
        };
        const icon = icons[sortType];
        const type = types[sortType];

        return ` <a href="?_sort&column=${field}&type=${type}">
        <span class="${icon}">
        </span>
        </a>`;
      },
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
