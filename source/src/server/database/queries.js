const mysql = require('mysql')
const moment = require('moment')

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
    (err, results) => {
      if (err) {
        throw new Error('Whoops! could not add class to DB! \n' + err)
      } else {
        return results
      }
    }
  )
}

const createClassModule = (req, res, next) => {
  let sessions = []
  const data = req.body.data
  pool.query(
    'INSERT INTO classes_modules(classid, moduleid, start_date, end_date) VALUES( ?, ?, ?, ?)',
    [data.classID, data.moduleID, data.start, data.end],
    (err, results) => {
      if (err) {
        throw new Error(
          'Something went wrong while createing a class module! \n' + err
        )
      } else {
        for (let i = 0; i <= data.numberOfWeeks; i++) {
          pool.query(
            'INSERT INTO sessions(module_id, session_date, classes_modules_id) VALUES(?, ?, ?)',
            [
              data.moduleID,
              moment(data.start, 'YYYY-MM-DD')
                .add(7 * (i + 1) - 7, 'days')
                .format('YYYY-MM-DD'),
              results.insertId
            ],
            (err, rows) => {
              if (err) {
                throw new Error(
                  'Something went wrong while createing a session! \n' + err
                )
              } else {
                sessions.push({
                  row: rows.insertId,
                  date: moment(data.start, 'YYYY-MM-DD')
                    .add(7 * (i + 1) - 7, 'days')
                    .format('YYYY-MM-DD')
                })
                res.mydata = { sessions, insertId: results.insertId }
                if (res.mydata.sessions.length > data.numberOfWeeks) {
                  next()
                }
              }
            }
          )
        }
      }
    }
  )
}

const assignMentor = data => {
  pool.query(
    'INSERT INTO sessions_mentors(session_id, mentor_id) VALUES(?, ?)',
    [data.date.row, data.mentor.id],
    (err, results) => {
      if (err) {
        throw new Error('Whoops! Could not update class in DB \n' + err)
      } else {
        return results
      }
    }
  )
}

const getClasses = (req, res, next) => {
  pool.query('SELECT * FROM classes', (err, rows) => {
    if (err) {
      res.send(new Error('Whoops! could not get classes from DB! \n' + err))
    } else {
      res.mydata = { rows }
      next()
    }
  })
}

const updateClass = classData => {
  pool.query(
    'UPDATE classes SET classname = ? WHERE id = ?',
    [classData.inp, classData.id],
    (err, results) => {
      if (err) {
        throw new Error('Whoops! Could not update class in DB \n' + err)
      } else {
        return results
      }
    }
  )
}

const deleteClass = classData => {
  pool.query('DELETE FROM classes WHERE id = ?', [classData], (err, results) => {
    if (err) {
      throw new Error('Whoops! Could not update class in DB \n' + err)
    } else {
      return results
    }
  })
}

const getModuleOptions = (req, res, next) => {
  pool.query('SELECT * FROM modules', (err, rows) => {
    if (err) {
      throw new Error(
        'Whoops! Something went wrong while fetching module options \n' + err
      )
    } else {
      res.mydata = { rows }
      next()
    }
  })
}

const getMentors = (req, res, next) => {
  pool.query('SELECT * FROM users WHERE role_id = 2', (err, rows) => {
    if (err) {
      throw new Error('Whoops! Something went wrong while fetching mentors \n' + err)
    } else {
      res.mydata = { rows }
      next()
    }
  })
}

const getRelevantClassModules = (req, res, next) => {
  pool.query(
    'SELECT * FROM classes_modules WHERE end_date >= now()',
    (err, rows) => {
      if (err) {
        throw new Error(
          'Whoops! Something went wrong while fetching relevant classes \n' + err
        )
      } else {
        res.mydata = { rows }
        next()
      }
    }
  )
}

module.exports = {
  createClass,
  getClasses,
  updateClass,
  deleteClass,
  getModuleOptions,
  getMentors,
  createClassModule,
  assignMentor,
  getRelevantClassModules
}
