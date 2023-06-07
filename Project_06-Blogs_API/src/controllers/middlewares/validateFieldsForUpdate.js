const validateFieldsForUpdate = async (req, res, next) => {
  const { title, content } = req.body;
  if (!title || title.length === 0 || !content || content.length === 0) {
    return res
      .status(400)
      .json({ message: 'Some required fields are missing' });
  }
  return next();
};

module.exports = validateFieldsForUpdate;
