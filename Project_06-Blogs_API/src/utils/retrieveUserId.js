const { verifyToken } = require('../authentication/authFunctions');

module.exports = (token) => {
  const userData = verifyToken(token);
  return userData.data.dataValues.id;
};
