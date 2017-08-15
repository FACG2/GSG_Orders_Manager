const { Pool } = require ('pg');

const env = require('env2')('./config.env');
if (!process.env.DB_URL) {
  throw new Error ('No database url provided')
}

const pool = new Pool ({ connectionString: process.env.DB_URL });

// pool.query('SELECT * FROM members where name= $1','iah-93@hotmail.com',(data)=>{
//   console.log(data.rows);
// })

module.exports = pool;
