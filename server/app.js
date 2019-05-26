const createError = require("http-errors");
const express = require("express");
const router = express.Router();
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cloudinary = require("cloudinary");
const mongoose = require("mongoose");

const routes = require("./routes/index");

const app = express();
const url = process.env.MONGODB_URI || "mongodb://localhost:27017/redium";

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
app.use(bodyParser.json());
app.use(helmet());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/** configure cloudinary */
cloudinary.config({
  cloud_name: "curtiskirimi",
  api_key: "829495872467168",
  api_secret: "R7splUvra_Qxwz4l4qYUOdrb__k"
});

/** connect to MongoDB datastore */
try {
  mongoose.connect(url, {
    // useMongoClient: true
    useNewUrlParser: true
  });
} catch (error) {
  console.log(error);
}

// set up routes {API endpoints}
routes(router);

app.use("/api", router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
