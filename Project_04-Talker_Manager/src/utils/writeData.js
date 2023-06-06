const path = require('path');
const fs = require('fs').promises;
const { getAll } = require('./readData');

const filePath = path.resolve(__dirname, '../talker.json');

const writeNewTalker = async (array) => {
  const arrayJSON = JSON.stringify(array);
  await fs.writeFile(filePath, arrayJSON, (err) => {
    if (err) console.log(err.message);
  });
};

const insertTalker = async (newTalkerData) => {
  const { name, age, talk: { watchedAt, rate } } = newTalkerData;
  const talkers = await getAll();
  const id = talkers[talkers.length - 1].id + 1;
  const newTalker = { id, name, age, talk: { watchedAt, rate } };
  talkers.push(newTalker);
  await writeNewTalker(talkers);
  return newTalker;
};

const updateTalker = async (talker, id) => {
  const { name, age, talk: { watchedAt, rate } } = talker;
  const talkers = await getAll();
  const talkerIndex = talkers.findIndex((el) => el.id === +id);
  talkers[talkerIndex] = {
    id: Number(id),
    name,
    age,
    talk: { watchedAt, rate },
  };
  await writeNewTalker(talkers);
  return talkers[talkerIndex];
};

const removeTalker = async (id) => {
  const talkers = await getAll();
  const remainingTalkers = talkers.filter((talker) => talker.id !== Number(id));
  await writeNewTalker(remainingTalkers);
};

const patchTalker = async (id, rate) => {
  const talkers = await getAll();
  const talkerIndex = talkers.findIndex((talker) => talker.id === +id);
  talkers[talkerIndex].talk.rate = rate;
  await writeNewTalker(talkers);
};

module.exports = {
  writeNewTalker,
  insertTalker,
  updateTalker,
  removeTalker,
  patchTalker,
};
