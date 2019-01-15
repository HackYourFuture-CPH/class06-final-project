require('dotenv').config({ path: '../../../.env' })
// Update with your config settings.

module.exports = {
  client: 'mysql',
  connection: {
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  }
}
