const bodyParser = require("body-parser");
const { facts } = require("./data/facts");
const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");

app.use(bodyParser.json());

var logStream = fs.createWriteStream(path.join(__dirname, "./log/access.log"), {
  flags: "a",
});
app.use(morgan("combined", { stream: logStream }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Accept, Authorization, Content-Type, Origin, X-Requested-With"
  );
  res.header("Access-Control-Allow-Methods", "GET");
  next();
});

app.get("/", (req, res) => {
  res.status(200).send({ data: facts[Math.floor(Math.random() * facts.length)]});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
