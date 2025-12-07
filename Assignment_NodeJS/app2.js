const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const port = process.env.PORT || 3000;

// EJS view engine
app.set("view engine", "ejs");

// Middleware to parse POST data
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
const uri = "mongodb+srv://dbuser120:CS120dbuser@cluster0.gyrixgj.mongodb.net/?appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
let collection;

async function connectDB() {
  try {
    await client.connect();
    const db = client.db("myDB");
    collection = db.collection("places");
    console.log("Connected to MongoDB Atlas!");
  } catch (err) {
    console.error(err);
  }
}

connectDB();

// -----------------
// Routes
// -----------------

// Home page
app.get("/", (req, res) => {
  res.render("home");
});

// Process form submission
app.post("/process", async (req, res) => {
  try {
    const userInput = req.body.query.trim();
    let query;

    if (/^\d+$/.test(userInput)) {
      // ZIP code search with regex to handle trailing whitespace
      const zipInput = userInput;
      query = { zips: { $regex: `^${zipInput}\\s*$` } };
      console.log("Searching ZIP code:", userInput);
    } else {
      // Place search (partial, case-insensitive)
      query = { place: { $regex: userInput, $options: "i" } };
      console.log("Searching Place:", userInput);
    }

    console.log("MongoDB query:", JSON.stringify(query, null, 2));

    const result = await collection.findOne(query);

    if (result) {
      console.log("Found:", result);
      res.render("process", { result });
    } else {
      console.log("No match found for:", userInput);
      res.render("process", { result: { place: "Not found", zips: [] } });
    }

  } catch (err) {
    console.error("Error processing request:", err);
    res.render("process", { result: { place: "Error", zips: [] } });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Web app running at http://localhost:${port}`);
});