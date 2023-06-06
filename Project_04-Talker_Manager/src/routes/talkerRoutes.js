const express = require('express');
const { getAll, getById, filterByQuery, verifyIdExists } = require('../utils/readData');
const { insertTalker, updateTalker, removeTalker, patchTalker } = require('../utils/writeData');
const {
  validateToken,
  validateTalkerInput,
  validateSearchInputs,
  validateRatePatch,
} = require('../middlewares/validateTalker');

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const talkers = await getAll();
    if (talkers) return res.status(200).json(talkers);
    return res.status(200).json([]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get('/search', validateToken, validateSearchInputs, async (req, res) => {
    const queryParams = req.query;
    const filteredTalkers = await filterByQuery(queryParams);
    if (filteredTalkers.length === 0) {
      return res.status(200).json([]);
    }
    return res.status(200).json(filteredTalkers);
  });

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const talker = await getById(id);
    if (talker) return res.status(200).json(talker);
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post('/', validateToken, validateTalkerInput, async (req, res) => {
  try {
    const newTalkerData = req.body;
    const response = await insertTalker(newTalkerData);
    return res.status(201).json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.put('/:id', validateToken, validateTalkerInput, async (req, res) => {
  try {
    const { id } = req.params;
    const isIdValid = await verifyIdExists(id);
    if (!isIdValid) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    const talker = req.body;
    const response = await updateTalker(talker, id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', validateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const isIdValid = await verifyIdExists(id);
    if (!isIdValid) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    await removeTalker(id);
    return res.status(204).end();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.patch('/rate/:id', validateToken, validateRatePatch, async (req, res) => {
  try {
    const { id } = req.params;
    const { rate } = req.body;
    const isIdValid = await verifyIdExists(id);
    if (!isIdValid) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    await patchTalker(id, rate);
    return res.status(204).end();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
