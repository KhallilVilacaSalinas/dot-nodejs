const express = require('express');
const router = express.Router();
const PontoController = require("../controller/pontoController")
const PontoMiddleware = require("../middlewares/PontoMiddlewares")

//router.get('/', PontoController.index);
router.get('/:id', PontoController.getId)

router.post('/', PontoController.store);

router.put('/:id', PontoMiddleware.validateId, PontoController.update)

router.delete('/:id', PontoMiddleware.validateId, PontoController.delete)



module.exports = router;
 