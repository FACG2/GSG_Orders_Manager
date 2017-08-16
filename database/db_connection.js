const { Pool } = require ('pg');
const env = require('env2')
env('./config.env');
const pool = new Pool ({ connectionString: process.env.DB_URL });
module.exports = pool;
switch (process.env.NODE_ENV) {
  case 'production':
    env={
      process.env.DB_URL='postgres://nmphnbtwuldxqs:3cd51aa8da6b43aba9314558df0fffea2f9cac415c3aa9d576d0357782d7494a@ec2-46-137-97-169.eu-west-1.compute.amazonaws.com:5432/d7l1vmkjbnpp5d';
    }
    break;
    case 'test':
    env={
    process.env.DB_URL:localhost;
    }
    break;
}

if (!process.env.DB_URL) {
  throw new Error ('No database url provided')
}
