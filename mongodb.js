const mongoose = require("mongoose");
require('dotenv').config();

function connectToDatabase() {
  mongoose.connect("mongodb+srv://khallil:mCev1xmRUzzNrSgn@cluster0.uopk9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;
  db.on("error", (error) => console.error(error))
  db.once("open", () => console.log("Connected to database!"))
}

module.exports = connectToDatabase;