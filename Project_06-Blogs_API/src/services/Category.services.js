const { Category } = require('../models');

const createCategory = async (name) => Category.create({ name });

const getAllCategories = async () => Category.findAll();

const getCategoryById = async (id) => Category.findByPk(id);

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
};
