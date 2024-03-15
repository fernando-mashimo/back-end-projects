const express = require('express');
const { categoryController } = require('../controllers');
const validateToken = require('../controllers/middlewares/validateToken');
const validateCategoryField = require('../controllers/middlewares/validateCategoryField');

const router = express.Router();

router.post('/', validateToken, validateCategoryField, categoryController.createCategory);
router.get('/', validateToken, categoryController.getAllCategories);

module.exports = router;
