const { verifyToken } = require('../../authentication/authFunctions');

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'Token not found' });

  try {
    const isUserToken = verifyToken(authorization);
    if (isUserToken) return next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};
