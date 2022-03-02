require('dotenv').config();
const express = require("express");
const ejs = require("ejs");

const mongoose = require("mongoose");
const router = require("./Routes/router");
const session = require("express-session");
const bodyParser = require("body-parser");

const MongoStore = require("connect-mongo");

const MONGO_URI = "mongodb://localhost:27017/motor-buddy";
const PORT = process.env.PORT || 4280;
const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to mongodb successfully"))
  .catch((err) => console.error("could not connect to mongodb", err));

app.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: MONGO_URI }),
    cookie: { httpOnly: true, maxAge: 43200000, secure: false },
  })
);

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use("/", router);
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/issue", (req, res) => {
  res.render("issue");
});
app.get("/mech", (req, res) => {
  res.render("mech");
});

app.post("/issues", urlencodedParser, function (req, res) {
  res.render("submitted-issues", { data: req.body });
});

app.post("/mechanic", urlencodedParser, function (req, res) {
  res.render("submitted", { data: req.body });
});

app.use((err, req, res, next) => {
  if (err) {
    console.log(err.message);
  }
});

app.listen(PORT, () => {
  console.log(`server listening at port:${PORT}`);
});
