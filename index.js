const express = require("express"),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  methodOverride = require("method-override"),
  cookieParser = require("cookie-parser"),
  session = require("express-session"),
  flash = require("connect-flash");

const routes = require("./routes/index"),
  {
    db_user,
    db_pwd,
    db_host,
    db_name,
    cookie_secret,
    session_secret
  } = require("./config");

const mongoSrvString = `mongodb+srv://${db_user}:${db_pwd}@${db_host}/${db_name}?retryWrites=true&w=majority`;

// connect the database
const db = mongoose
  .connect(mongoSrvString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
  })
  .then(() => {
    console.log("Connected to mongo db");
  })
  .catch(err => {
    console.log("Couldn't connect to mongo db, err: ", err);
  });

// initialise express app
const app = express();

// view engine setup
app.set("view engine", "ejs");

// middleware setup
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

// connect-flash setup
app.use(cookieParser(cookie_secret));
app.use(
  session({
    cookie: { maxAge: 60000 },
    secret: session_secret,
    resave: false,
    saveUninitialized: true
  })
);
app.use(flash());

app.use("/", routes);

const port = process.env.PORT || 5000;

// begin listening
app.listen(port, err => {
  if (err) console.log(err);
  else console.log("App listening on port " + port);
});
