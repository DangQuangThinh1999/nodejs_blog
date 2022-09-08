const express = require("express");
const path = require("path");
const morgan = require("morgan");
const { engine } = require("express-handlebars");
const route = require("./routes");
const methodOverride = require("method-override");
const db = require("../src/config/db/index");
const SortMiddleware = require("./app/middlewares/SortMiddleware");

const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
const dotenv = require("dotenv").config();
//Sử dụng module cookie-parse
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
//----------------------------------------------------------
// Passport Config
require("./config/passport")(passport);

// Connect DB
db.connect();
const app = express();

//Express body parser
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
const port = 3000;
// Express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    maxAge: 5 * 60,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Khai báo sử dụng middleware cookieParse()
app.use(cookieParser());
// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success = req.flash("success_msg");

  res.locals.error = req.flash("error");
  next();
});

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
