const mysql = require('mysql')

const pool = mysql.createPool({
  connectionLimit: 100,
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
      if (err) {
        throw new Error('Whoops! could not add class to DB! \n' + err)
      } else {
        return results
      }
    }
  )
}

async function getClasses(req, res, next) {
  pool.query('select * from classes', (err, rows) => {
    if (err) {
      res.send(new Error('Whoops! could not get classes from DB! \n' + err))
    } else {
      req.mydata = { rows }
      next()
    }
  })
}

module.exports = {
  createClass,
  getClasses
}
