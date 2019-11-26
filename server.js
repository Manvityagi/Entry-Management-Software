const express = require("express"),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  methodOverride = require("method-override"),
  cookieParser = require("cookie-parser"),
  session = require("express-session"),
  flash = require("connect-flash");

const { db_user, db_pwd } = require("./config");

db = mongoose.connect(
  "mongodb+srv://" +
    db_user +
    ":" +
    db_pwd +
    "@cluster0-zpztw.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  err => {
    if (err) console.log(err);
    else console.log("mongo atlas connected");
  }
);

const app = express();

mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

//  Connect all our routes to our application
const routes = require("./routes/index");

// view engine setup
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use(cookieParser("secret"));
app.use(session({
  cookie: { maxAge: 60000 },
  secret: 'djhxcvxfgshajfgjhgsjhfgsakjeauytsdfy',
  resave: false,
  saveUninitialized: true
  }));
app.use(flash());

app.use(function(req, res, next){

  //whatever we put in res.locals is whats available inside of our template
  res.locals.error       =   req.flash("error");
  res.locals.success     =   req.flash("success");
  next();
});

app.use("/", routes);

const port = process.env.PORT || 5000;

app.listen(port, err => {
  if (err) console.log(err);
  else console.log("App listening on port " + port);
});
