const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.ENV_HOST,
  database: process.env.ENV_DATABASE,
  user: process.env.ENV_PASS,
  port: 5432,
  password: process.env.ENV_USER,
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
