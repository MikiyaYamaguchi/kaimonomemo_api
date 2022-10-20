var createError = require("http-errors");
var express = require("express");
var cors = require("cors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cron = require("node-cron");
var pool = require("./db/pool");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

//定期実行処理（1日以上経った古いデータを削除）
cron.schedule("0 0 0 * * *", () => {
  pool.query(
    "DELETE FROM share_urls WHERE registration_time <= cast(now() - interval '1 day' as timestamp)",
    function (error, result) {
      if (error) throw error;
      console.log(`${result.rowCount}件のデータを削除しました。`);
    }
  );
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
