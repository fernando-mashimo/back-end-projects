const fs = require('fs').promises;
const path = require('path');

const talkerPath = path.resolve(__dirname, '../talker.json');

const readJsonData = async (filePath) => {
  try {
    const response = await fs.readFile(filePath);
    const data = JSON.parse(response);
    return data;
  } catch (error) {
    console.error(`Erro ao ler o arquivo: ${error.path}`);
  }
};

const getAll = () => readJsonData(talkerPath);

const getById = async (id) => {
  const talkers = await getAll();
  const talker = talkers.find((talkerElem) => talkerElem.id === +id);
  return talker;
};

const filterByQuery = async (queryParams) => {
  const queryKeys = Object.keys(queryParams);
  const { q, rate, date } = queryParams;
  const talkers = await getAll();
  let filtered = talkers;
  queryKeys.forEach((queryKey) => {
    switch (queryKey) {
      case 'q':
        filtered = filtered.filter((talker) => talker.name.toLowerCase().includes(q.toLowerCase()));
        break;
      case 'rate':
        filtered = filtered.filter((talker) => talker.talk.rate === Number(rate));
        break;
      default:
        if (date === '') filtered = talkers;
        else filtered = filtered.filter((talker) => talker.talk.watchedAt === date);
    }
  });
  return filtered;
};

const verifyIdExists = async (id) => {
  const talkers = await getAll();
  if (!talkers.some((talker) => talker.id === Number(id))) {
    return false;
  }
  return true;
};

module.exports = {
  getAll,
  getById,
  filterByQuery,
  verifyIdExists,
};
