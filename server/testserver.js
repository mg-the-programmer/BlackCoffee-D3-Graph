const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Connect to the MongoDB database
mongoose.connect("mongodb+srv://manigandan:manigandan@cluster0.oyky4iz.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

// Create a MongoDB model for the JSON data
const jsonDataSchema = new mongoose.Schema({
  // define the schema for the JSON data
  end_year: String,
  intensity: Number,
  sector: String,
  topic: String,
  insight: String,
  url: String,
  region: String,
  start_year: String,
  impact: String,
  added: String,
  published: String,
  country: String,
  relevance: Number,
  pestle: String,
  source: String,
  title: String,
  likelihood: Number,
});
const JsonData = mongoose.model("JsonData", jsonDataSchema);

// Define routes for retrieving the data from the database
app.get("/data", (req, res) => {
  JsonData.find((err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(data);
  });
});

// Start the Express server
app.listen(5000, () => {
  console.log("Server started on port 3000");
});
