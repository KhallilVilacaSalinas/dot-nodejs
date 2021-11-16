const mongoose = require("mongoose");

const pontoSchema = new mongoose.Schema({
  _idComprovante: {
    type : String,
    required: true,
  },
  idUser: {
    type : String,
    required: true,
  },
  dateTime: {
    type: String,
    required: true,
  },
  dateTile: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("pontos", pontoSchema);
