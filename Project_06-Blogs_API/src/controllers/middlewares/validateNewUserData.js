const { userServices } = require('../../services');

const validateNameLength = (req, res, next) => {
  const { displayName } = req.body;
  if (displayName.length < 8) {
    return res
      .status(400)
      .json({ message: '"displayName" length must be at least 8 characters long' });
  }
  return next();
};

const validateEmail = async (req, res, next) => {
  const { email } = req.body;
  const emailRegEx = /[^\s@]+@[^\s@]+\.[^\s@]+/gi;
  if (!emailRegEx.test(email)) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }

  const isEmailAlreadyUsed = await userServices.getUserByEmail(email);
  if (isEmailAlreadyUsed) {
    return res.status(409).json({ message: 'User already registered' });
  }

  return next();
};

const validatePasswordLength = (req, res, next) => {
  const { password } = req.body;
  if (password.length < 6) {
    return res.status(400).json({
      message: '"password" length must be at least 6 characters long',
    });
  }
  return next();
};

const validateNewUserData = [
  validateNameLength,
  validateEmail,
  validatePasswordLength,
];

module.exports = validateNewUserData;
