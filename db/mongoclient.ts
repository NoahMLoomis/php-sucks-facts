import { MongoClient } from "mongodb";

const getClient = async () =>
  await new MongoClient(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.7aann67.mongodb.net/?retryWrites=true&w=majority`
  ).connect();

const getAllFacts = async (): Promise<string[]> =>
  (
    await (await getClient())
      .db("phpsucksfacts")
      .collection("facts")
      .find()
      .toArray()
  ).map((d) => d.fact);

const getRandomFact = async (): Promise<string> => {
  const randFact = (await getClient())
    .db("phpsucksfacts")
    .collection("facts")
    .aggregate([{ $sample: { size: 1 } }])
    .toArray();

  return (await randFact)[0].fact;
};

const getFactByIndex = async (index: number): Promise<string> =>
  (await getAllFacts())[index];

const addFact = async (reason: string) => {
  return (await (await getClient())
    .db("phpsucksfacts")
    .collection("facts")
    .insertOne({ fact: reason })).insertedId;
};

export { getAllFacts, getRandomFact, getFactByIndex, addFact };
