const connection = require('../db/connection');

const findAll = async () => connection.execute('SELECT * from TalkerDB.talkers');

module.exports = findAll;
