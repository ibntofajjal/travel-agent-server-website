// Import Express and MongoDB included 'dotenv'
const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const ObjectId = require("mongodb").ObjectId;
require("dotenv").config();

// Middleware
const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nlpea.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
console.log(uri);

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Checking The Server is running or not :)
app.get("/", (req, res) => {
  res.send("Travel Agent Server is Running");
});

app.listen(port, () => {
  console.log(`App is Running on Port: ${port}`);
});
