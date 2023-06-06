const express = require('express');
const usertoken = require('../token/token');
const { validateEmail, validatePassword } = require('../middlewares/validateLogin');

const router = express.Router();

router.post('/', validateEmail, validatePassword, async (_req, res) => {
  try {
    const token = await usertoken();
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
