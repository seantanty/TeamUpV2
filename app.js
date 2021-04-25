const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const passport = require("passport");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "yongliangandxinyi",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

app.use(express.static(path.join(__dirname, "front/build")));
app.use("/", indexRouter);

app.get("/*", (req, res) =>
  res.sendFile(path.resolve("front", "build", "index.html"))
);

module.exports = app;
