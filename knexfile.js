require('dotenv').config()

module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL || {
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    sslmode: process.env.PGSSLMODE,
  },
  pool: {
    min: 1,
    max: 10,
  },
  migrations: {
    directory: './migrations/',
  },
}
