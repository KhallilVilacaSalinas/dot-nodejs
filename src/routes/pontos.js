const express = require('express');
const router = express.Router();
const multer = require('multer');

const PontoController = require("../controller/pontoController")
const PontoMiddleware = require("../middlewares/PontoMiddlewares")

const upload = multer({
    dest: './tmp',
    fileFilter: (req, file, cb) => {
        const allowed = ['image/jpg', 'image/jpeg', 'image/png'];
        cb(null, allowed.includes(file.mimetype))
    },
});

router.get('/:id', PontoController.getId)

router.post('/', upload.single('comprovante'), PontoController.store);

router.put('/:id', PontoMiddleware.validateId, PontoController.update)

router.delete('/:id', PontoMiddleware.validateId, PontoController.delete)

module.exports = router;
