const express = require('express');
const { salesController } = require('../controllers');
const {
  checkProductIdReceived,
  checkQuantityReceived,
  validateSaleQuantity,
} = require('../middlewares/salesValidatePostFields');

const router = express.Router();

router.post('/',
  checkProductIdReceived, checkQuantityReceived, validateSaleQuantity, salesController.createSale);
router.get('/', salesController.getAll);
router.get('/:id', salesController.getSaleById);
router.delete('/:id', salesController.deleteSale);
router.put('/:id',
  checkProductIdReceived,
  checkQuantityReceived,
  validateSaleQuantity,
  salesController.updateSale);

module.exports = router;
