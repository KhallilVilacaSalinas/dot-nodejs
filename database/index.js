const mongoose = require("mongoose");
require('dotenv').config();

function connectToDatabase() {
  mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });

  const db = mongoose.connection;
  db.on("error", (error) => console.error(error))
  db.once("open", () => console.log("Connected to database!"))
}

module.exports = connectToDatabase;