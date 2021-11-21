
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const crypto = require("crypto");

console.log(process.env.AWS_ACCESS_KEY_ID)
const storageTypes = multerS3({
  s3: new AWS.S3(),
  bucket: 'comprovanteponto',
  contentType: multerS3.AUTO_CONTENT_TYPE,
  acl: 'public-read',
  key: (req, file, cb) => {
    crypto.randomBytes(16, (err, hash) => {
      if (err) cb(err);
      const text = file.mimetype;
      const mimetype = text.split("/")
      const fileName = `${hash.toString("hex") + Date.now() + "." + mimetype[1]}`;

      cb(null, fileName);
    });
  }
});

module.exports = {
  storage: storageTypes,
  limits: {
    fileSize: 2 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      "image/jpg",
      "image/jpeg",
      "image/png",
    ];

    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
};