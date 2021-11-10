const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const ObjectId = require("mongodb").ObjectId;
const { MongoClient } = require("mongodb");
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nlpea.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();

    const database = client.db("travelSpot");
    const spotsCollection = database.collection("spots");
    const bookingsCollection = database.collection("bookings");

    await client.connect();

    // Add Spots/Services
    app.post("/addSpot", async (req, res) => {
      const result = await spotsCollection.insertOne(req.body);
      res.send(result);
    });

    // Get All Sports/Services
    app.get("/services", async (req, res) => {
      const result = await spotsCollection.find({}).toArray();
      res.send(result);
    });

    // Get Single Product
    app.get("/singleProduct/:id", async (req, res) => {
      const result = await spotsCollection
        .find({ _id: ObjectId(req.params.id) })
        .toArray();
      res.send(result[0]);
    });

    // Confirm Order
    app.post("/confirmOder", async (req, res) => {
      const result = await bookingsCollection.insertOne(req.body);
      res.send(result);
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

// Checking The Server is running or not :)
app.get("/", (req, res) => {
  res.send("Travel Agent Server is Running");
});

app.listen(port, () => {
  console.log(`App is Running on Port: ${port}`);
});
