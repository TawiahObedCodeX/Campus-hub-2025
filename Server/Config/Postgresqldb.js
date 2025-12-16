require('dotenv').config();
const { Pool } = require('pg');
// PostgreSQL Connection Pool
const pgPool = new Pool({
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
});

pgPool.on('connect', () => {
  console.log('PostgreSQL connected successfully');
});

pgPool.on('error', (err) => {
  console.error('PostgreSQL pool error:', err);
});

module.exports = { pgPool };