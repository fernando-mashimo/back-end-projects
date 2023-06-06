const { productsService } = require('../services');

const getAll = async (_req, res) => {
  const { type, message } = await productsService.getAll();
  if (type) return res.status(404).json({ message });
  return res.status(200).json(message);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.getProductById(Number(id));
  if (type) return res.status(404).json({ message });
  return res.status(200).json(message);
};

const createProduct = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productsService.createProduct(name);
  if (type) return res.status(422).json({ message });
  return res.status(201).json(message);
};

const editProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { type, message } = await productsService.editProduct(Number(id), name);
  if (type) return res.status(type).json({ message });
  return res.status(200).json(message);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.deleteProduct(Number(id));
  if (type) return res.status(type).json({ message });
  return res.status(204).end();
};

const getProductByName = async (req, res) => {
  const { q } = req.query;
  const { type, message } = await productsService.getProductByName(q);
  return res.status(type).json(message);
};

module.exports = {
  getAll,
  getProductById,
  createProduct,
  editProduct,
  deleteProduct,
  getProductByName,
};
