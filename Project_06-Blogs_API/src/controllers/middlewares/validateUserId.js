const { blogPostServices } = require('../../services');
const retrieveUserId = require('../../utils/retrieveUserId');

const validateUserId = async (req, res, next) => {
  const { id } = req.params;
  const { authorization } = req.headers;
  const currentUserId = retrieveUserId(authorization);
  const post = await blogPostServices.getPostById(+id);
  if (currentUserId !== post.dataValues.userId) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }
  return next();
};

module.exports = validateUserId;