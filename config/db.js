const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, 
  },
});

(async () => {
  try {
    await pool.connect();
    console.log('Connected to the database');
  } catch (error) {
    console.error('Database connection error:', error);
  }
})();

module.exports = pool;
