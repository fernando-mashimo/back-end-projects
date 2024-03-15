const { blogPostServices } = require('../../services');

const validateIfPostExists = async (req, res, next) => {
  const { id } = req.params;
  const post = await blogPostServices.getPostById(+id);
  if (!post) return res.status(404).json({ message: 'Post does not exist' });
  req.postStorage = post;
  return next();
};

module.exports = validateIfPostExists;
