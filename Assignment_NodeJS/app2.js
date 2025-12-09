const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const port = 8080;

// Middleware
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

// Home page (search form)
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Search Places</title>
      </head>
      <body>
        <h1>Search Places</h1>
        <form action="/process" method="POST">
          <input type="text" name="query" placeholder="Enter place or ZIP" required />
          <button type="submit">Search</button>
        </form>
      </body>
    </html>
  `);
});

app.post("/process", async (req, res) => {
  try {
    const userInput = req.body.query.trim();

    let query;
    if (/^\d/.test(userInput)) {

      query = { zips: { $regex: `^${userInput}` } };
      console.log("Searching ZIP:", userInput);
    } else {

      query = { place: { $regex: userInput, $options: "i" } };
      console.log("Searching Place:", userInput);
    }

    // Search the database
    const result = await collection.findOne(query) || { place: "Not found", zips: [] };

    res.send(`
      <html>
        <head>
          <title>Results</title>
        </head>
        <body>
          <h1>Search Results</h1>
          <p><strong>Place:</strong> ${result.place}</p>
          <p><strong>ZIPs:</strong> ${result.zips.join(", ")}</p>
          <a href="/">Go back</a>
        </body>
      </html>
    `);

  } catch (err) {
    console.error("Error:", err);
    res.send(`
      <html>
        <head>
          <title>Error</title>
        </head>
        <body>
          <h1>Error occurred</h1>
          <p>Please try again later.</p>
          <a href="/">Go back</a>
        </body>
      </html>
    `);
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});