const mongoose = require("mongoose");
const aws = require("aws-sdk");
const s3 = new aws.S3();

const pontoSchema = new mongoose.Schema({
  _idComprovante: {
    type: String,
    required: true,
  },
  idUser: {
    type: String,
    required: true,
  },
  dateTime: {
    type: String,
    required: true,
  },
  dateTile: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
});

pontoSchema.pre("remove", function () {

  let text = this.image;
  const key = text.split("/");
  return s3.deleteObject({
    Bucket: 'comprovanteponto',
    Key: key[3]
  })
    .promise()
    .then(response => {
      console.log(response.status);
    })
    .catch(response => {
      console.log(response.status);
    });

});


module.exports = mongoose.model("pontos", pontoSchema);
