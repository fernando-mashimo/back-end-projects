const express = require('express');
const findAll = require('../utils/readDBData');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const [response] = await findAll();
    const result = response.map((el) => ({
      name: el.name,
      age: el.age,
      id: el.id,
      talk: {
        watchedAt: el.talk_watched_at,
        rate: el.talk_rate,
      },
    }));
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
