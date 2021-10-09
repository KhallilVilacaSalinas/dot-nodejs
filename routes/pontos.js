const express = require('express');
const router = express.Router();
const PontoController = require("../controller/pontoController")
const PontoMiddleware = require("../middlewares/PontoMiddlewares")

router.get('/', PontoController.index);

router.post('/', PontoController.store);

router.put('/:id', PontoMiddleware.validateId, PontoController.update)



module.exports = router;
