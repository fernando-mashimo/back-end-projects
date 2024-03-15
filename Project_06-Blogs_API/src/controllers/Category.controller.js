const { categoryServices } = require('../services');

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = await categoryServices.createCategory(name);
    return res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const getAllCategories = async (_req, res) => {
  try {
    const allCategories = await categoryServices.getAllCategories();
    return res.status(200).json(allCategories);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
};