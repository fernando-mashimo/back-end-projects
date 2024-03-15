const express = require('express');
const { userController } = require('../controllers');
const validateNewUserData = require('../controllers/middlewares/validateNewUserData');
const validateToken = require('../controllers/middlewares/validateToken');

const router = express.Router();

router.post('/', validateNewUserData, userController.createUser);
router.get('/:id', validateToken, userController.getUserById);
router.get('/', validateToken, userController.getAllUsers);
router.delete('/me', validateToken, userController.deleteUser);

module.exports = router;
