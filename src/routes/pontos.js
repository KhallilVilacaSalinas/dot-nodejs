const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerConfig = require("../config/multer");

const PontoController = require("../controller/pontoController");
const PontoMiddleware = require("../middlewares/PontoMiddlewares");


router.get('/:id', PontoController.getId)

router.post('/', multer(multerConfig).single('comprovante'), PontoController.store);

router.put('/:id', PontoMiddleware.validateId, PontoController.update)

router.delete('/:id', PontoMiddleware.validateId, PontoController.delete)

module.exports = router;
