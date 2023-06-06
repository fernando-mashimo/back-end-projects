const fs = require('fs')
const path = require('path')
const mysql = require('mysql2/promise')
const frisby = require("frisby");


const { cwd } = process

const connect = () => mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  multipleStatements: true
})

const runSql = (file) => async () => {
  const db = connect()
  const sql = fs.readFileSync(file, 'utf8')
  await db.query(sql)
  await db.end()
}

const runMigration = runSql(path.resolve(cwd(), 'migration.sql'))
const runSeed = runSql(path.resolve(cwd(), 'seed.sql'))


const isAlive = async (msg = 'Server was not running while the test start') => {
  const url = `http://${process.env.HOST}:${process.env.PORT}`;
  
  try {
    const { status } = await frisby.get(`${url}/`);

    if (status !== 200) {
      throw new Error('You changed the root app endpoint! Check on the Readme!');
    }
    return null;
  } catch (error) {
    const err = new Error(msg);
    err.stack = null;
    throw err;
  }

}

const itTrybe = (description, fnTest) => { 
  it(description, async (done) => {
    try {
      await isAlive();
      await fnTest();
      await isAlive('Server crashed after the test finished');
      done()
    } catch (error) {
      throw error;
    }
   })
}

module.exports = {
  connect,
  runMigration,
  runSeed,
  isAlive,
  itTrybe,
}