import bodyParser = require("body-parser");
import dotenv = require("dotenv");
import express = require("express");
const app = express();
import {
  getAllFacts,
  getRandomFact,
  getFactByIndex,
  addFact,
} from "../db/mongoclient";
const FACT_NOT_FOUND = "Fact not found"

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

let requestsCount = 0;
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

app.get(["/", "/facts"], async (req, res) => {
  requestsCount++;
  res.status(200).send({ data: await getRandomFact() });
});

app.get("/facts/all", async (req, res) => {
  res.status(200).send({ data: await getAllFacts() });
});

app.get("/facts/:id", async (req, res) => {
  requestsCount++;
  if (await getFactByIndex(Number(req.params.id))) {
    res.status(200).send({ data: await getFactByIndex(Number(req.params.id)) });
  } else {
    res.status(400).send({ data: FACT_NOT_FOUND });
  }
});

app.post("/facts/add", async (req, res) => {
  requestsCount++;
  if (!req.body.data) {
    res.sendStatus(400);
  } else {
    const status = await addFact(req.body.data)
    console.log(`status: ${status}`)
    if (status === null) {
      res.sendStatus(400)
    }else {
      res.sendStatus(200)
    }
  }
});

app.get("/requestsCount", (req, res) => {
  res.status(200).send({ data: { requestsCount } });
});

const server = app.listen(process.env.PORT || 5000, function () {
  const host =
    server.address()["address"] === "::"
      ? "localhost"
      : server.address()["address"];
  const port = server.address()["port"];

  console.log(`app listening at http://${host}:${port}`);
});

module.exports = server;
