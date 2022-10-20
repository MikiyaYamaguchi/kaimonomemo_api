const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.ENV_HOST2,
  database: process.env.ENV_DATABASE2,
  user: process.env.ENV_PASS2,
  port: 5432,
  password: process.env.ENV_USER2,
  connectionString: process.env.DATABASE_URL2,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
