const fs = require("fs");
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://dbuser120:CS120dbuser@cluster0.gyrixgj.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {

    // Connect and ping MongoDB

    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged MongoDB Atlas — connection successful!\n");


    // Read CSV File

    const data = fs.readFileSync("zips.csv", "utf8");
    const rows = data.trim().split("\n");

    const places = [];
    const indexes = {};

    console.log("Reading CSV and building place objects...\n");

    for (let row of rows) {
      const [place, zip] = row.split(",");

      if (!indexes.hasOwnProperty(place)) {
        const newPlace = {
          place: place,
          zips: [zip]
        };
        places.push(newPlace);
        indexes[place] = places.length - 1;

        console.log(`Added new place: ${place} with ZIP ${zip}`);
      } else {
        const index = indexes[place];
        if (!places[index].zips.includes(zip)) {
          places[index].zips.push(zip);
          console.log(`Updated place: ${place} with additional ZIP ${zip}`);
        }
      }
    }


    // Insert

    const db = client.db("myDB");
    const collection = db.collection("places");

    const result = await collection.insertMany(places);
    console.log(`Inserted ${result.insertedCount} places into MongoDB.\n`);

  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
    console.log("MongoDB connection closed.");
  }
}

run().catch(console.dir);