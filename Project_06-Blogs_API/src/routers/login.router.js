const express = require('express');
const { userController } = require('../controllers');
const validateLoginFields = require('../controllers/middlewares/validateLoginFields');

const router = express.Router();

router.post('/', validateLoginFields, userController.userLogin);

module.exports = router;
