const { Pool } = require ('pg');

const env = require('env2')('./config.env');
if (!process.env.DB_URL) {
  throw new Error ('No database url provided')
}

const pool = new Pool ({ connectionString: process.env.DB_URL });

module.exports = pool;
