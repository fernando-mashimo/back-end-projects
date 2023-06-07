// const fs = require('fs').promises;
// const path = require('path');

// const TOKEN_FILE_PATH = path.resolve(__dirname, './tokenAuth.txt');

const token = async () => {
  const randomKey = Math.random().toString(36) + Math.random().toString(36);
  const newToken = randomKey.slice(0, 16);
  // await fs.writeFile(TOKEN_FILE_PATH, newToken);
  return newToken;
};

module.exports = token;
