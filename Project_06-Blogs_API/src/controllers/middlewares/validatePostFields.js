const { categoryServices } = require('../../services');

const validateFields = (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  if (!title || !content || !categoryIds || categoryIds.length === 0) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  return next();
};

const validateCategoryIds = async (req, res, next) => {
  const { categoryIds } = req.body;
  const categories = await Promise.all(categoryIds
    .map((categoryId) => categoryServices.getCategoryById(categoryId)));
  if (!categories.every((category) => category)) {
    return res.status(400).json({ message: 'one or more "categoryIds" not found' });
  }
  return next();
};

const validatePostFields = [validateFields, validateCategoryIds];

module.exports = validatePostFields;
