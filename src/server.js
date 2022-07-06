const bodyParser = require("body-parser");
const { facts } = require("./data/facts");
const express = require("express");
const port = 3000;
const fs = require("fs");
const favicon = require("serve-favicon");
const app = express();
const FACT_NOT_FOUND = `Fact not found, number must be between 0-${
  facts.length - 1
}`;
let requestsCount = 0;

app.use(favicon(`${__dirname}/public/images/favicon.ico`));

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Accept, Authorization, Content-Type, Origin, X-Requested-With"
  );
  res.header("Access-Control-Allow-Methods", "GET");
  next();
});

app.get("/facts", (req, res) => {
  requestsCount++;
  res
    .status(200)
    .send({ data: facts[Math.floor(Math.random() * facts.length)] });
});

app.get("/facts/all", (req, res) => {
  res.status(200).send({ data: facts });
});

app.get("/facts/:id", (req, res) => {
  requestsCount++;
  if (facts[req.params.id]) {
    res.status(200).send({ data: facts[req.params.id] });
  } else {
    res.status(400).send({ data: FACT_NOT_FOUND });
  }
});

app.post("/facts/add", (req, res) => {
  requestsCount++;
  req.body.data !== "" ? res.sendStatus(200) : res.sendStatus(400);
});

app.get("/requestsCount", (req, res) => {
  res.status(200).send({ data: { requestsCount } });
});

const server = app.listen(process.env.PORT || 5000, function () {
  const host =
    server.address().address === "::" ? "localhost" : server.address().address;
  const port = server.address().port;

  console.log(`app listening at http://${host}:${port}`);
});

module.exports = server;
