const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'petconnect',
  password: '93579220',
  port: 5432,
});

module.exports = pool;
