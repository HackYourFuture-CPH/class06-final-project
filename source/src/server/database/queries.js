const mysql = require('mysql')
// const moment = require('moment')

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
})

const createClass = classData => {
  pool.query(
    'INSERT INTO classes (classname, active) VALUES( ?, ?)',
    [classData.name, true],
    (err, results, fields) => {
      console.log(results)
      if (err) {
        throw new Error('Whoops! could not add class to DB! \n' + err)
      } else {
        return results
      }
    }
  )
}

module.exports = { createClass }
