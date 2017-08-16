const { Pool } = require ('pg');

<<<<<<< HEAD
const env = require('env2')
env('./config.env');


switch (process.env.NODE_ENV) {
  case 'production':
        process.env.DB_URL= 'postgres://nmphnbtwuldxqs:3cd51aa8da6b43aba9314558df0fffea2f9cac415c3aa9d576d0357782d7494a@ec2-46-137-97-169.eu-west-1.compute.amazonaws.com:5432/d7l1vmkjbnpp5d'
    break;
  case 'test':
       process.env.DB_URL = ''
  default:

}



=======
const env = require('env2')('./config.env');
>>>>>>> b8dd498ab43d8c323686acfd071fb57e4a78f5e4
if (!process.env.DB_URL) {
  throw new Error ('No database url provided')
}

const pool = new Pool ({ connectionString: process.env.DB_URL });

// pool.query('SELECT * FROM members where name= $1','iah-93@hotmail.com',(data)=>{
//   console.log(data.rows);
// })

module.exports = pool;
