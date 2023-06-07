const express = require('express');
const validateToken = require('../controllers/middlewares/validateToken');
const { postController } = require('../controllers');
const validatePostFields = require('../controllers/middlewares/validatePostFields');
const validateUserId = require('../controllers/middlewares/validateUserId');
const validateFieldsForUpdate = require('../controllers/middlewares/validateFieldsForUpdate');
const validateIfPostExists = require('../controllers/middlewares/validateIfPostExists');

const router = express.Router();

router.get('/search', validateToken, postController.searchPostByTerm);
router.post('/', validateToken, validatePostFields, postController.createPost);
router.put(
  '/:id',
  validateToken,
  validateUserId,
  validateFieldsForUpdate,
  validateIfPostExists,
  postController.updatePost,
);
router.get('/:id', validateToken, validateIfPostExists, postController.getPostById);
router.get('/', validateToken, postController.getAllPosts);
router.delete(
  '/:id',
  validateToken,
  validateIfPostExists, // a ordem dos middlewares importa. Este deve vir antes de validateUserId
  validateUserId,
  postController.deletePost,
);

module.exports = router;
