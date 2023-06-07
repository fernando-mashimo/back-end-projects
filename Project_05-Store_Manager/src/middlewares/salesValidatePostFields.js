const checkProductIdReceived = (req, res, next) => {
  const itemsArray = req.body;
  const checkAllItems = itemsArray.every((item) => item.productId);
  if (!checkAllItems) return res.status(400).json({ message: '"productId" is required' });
  return next();
};

const checkQuantityReceived = (req, res, next) => {
  const itemsArray = req.body;
  const checkAllItems = itemsArray.every((item) => Math.abs(item.quantity) >= 0);
  if (!checkAllItems) return res.status(400).json({ message: '"quantity" is required' });
  return next();
};

const validateSaleQuantity = (req, res, next) => {
  const itemsArray = req.body;
  const quantityIsValid = itemsArray.every((item) => item.quantity > 0);
  if (!quantityIsValid) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  return next();
};

module.exports = {
  checkProductIdReceived,
  checkQuantityReceived,
  validateSaleQuantity,
};
