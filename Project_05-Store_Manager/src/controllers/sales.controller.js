const { salesService } = require('../services');

const createSale = async (req, res) => {
  const itemsArray = req.body;
  const { type, message } = await salesService.createSale(itemsArray);
  if (type) return res.status(type).json({ message });
  return res.status(201).json(message);
};

const getAll = async (_req, res) => {
  const { type, message } = await salesService.getAll();
  if (type) return res.status(type).json({ message });
  return res.status(200).json(message);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.getSaleById(Number(id));
  if (type) return res.status(type).json({ message });
  return res.status(200).json(message);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.deleteSale(Number(id));
  if (type) return res.status(type).json({ message });
  return res.status(204).end();
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const itemsArray = req.body;
  const { type, message } = await salesService.updateSale(id, itemsArray);
  if (type) return res.status(type).json({ message });
  return res.status(200).json(message);
};

module.exports = {
  createSale,
  getAll,
  getSaleById,
  deleteSale,
  updateSale,
};
