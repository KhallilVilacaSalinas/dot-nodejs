const express = require('express');
const router = express.Router();
const PontoController = require("../controller/pontoController")
const PontoMiddleware = require("../middlewares/PontoMiddlewares")

var myModule = require('../controller/pontoController');
const multer =  require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, './uploads');
  },
  filename: async function(req, file, callback) {
    let data = new Date().toISOString().replace(/:/g,'-') + '-'
    callback(null, data + file.originalname)
  }
});
const upload = multer({
  storage: storage
});

router.get('/', PontoController.index);

router.post('/', upload.single('ponto_image'), PontoController.store);

router.put('/:id', PontoMiddleware.validateId, PontoController.update)
router.delete('/:id', PontoMiddleware.validateId, PontoController.delete)



module.exports = router;
 