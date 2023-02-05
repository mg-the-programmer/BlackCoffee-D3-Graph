const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
require("dotenv").config();

const app = express();

// Connect to MongoDB
const url = process.env.MONGO_URI;
mongoose.connect(
  "mongodb+srv://manigandan:manigandan@cluster0.oyky4iz.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

const connection = mongoose.connection;

// Read the local JSON file
const data = fs.readFileSync("jsondata.json");
const documents = JSON.parse(data);

// Insert the documents into the database
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
  connection.db.collection("blackcoffee").countDocuments((err, count) => {
    if (err) throw err;
    if (count === 0) {
      connection.db
        .collection("blackcoffee")
        .insertMany(documents, (err, result) => {
          if (err) throw err;
          console.log(
            `Inserted ${result.insertedCount} documents into the database`
          );
        });
    } else {
      console.log("Data already exists in the collection, skipping insert");
    }
  });
});
// Create a GET route
app.get("/api", (req, res) => {
  connection.db
    .collection("blackcoffee")
    .find({})
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

// Start the server
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
