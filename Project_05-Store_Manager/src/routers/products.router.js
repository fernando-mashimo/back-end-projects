const express = require('express');

const { productsController } = require('../controllers');
const productsValidatePostFields = require('../middlewares/productsValidatePostFields');

const router = express.Router();

router.get('/', productsController.getAll);
router.get('/search', productsController.getProductByName);
router.get('/:id', productsController.getProductById);
router.post('/', productsValidatePostFields, productsController.createProduct);
router.put('/:id', productsValidatePostFields, productsController.editProduct);
router.delete('/:id', productsController.deleteProduct);

module.exports = router;
