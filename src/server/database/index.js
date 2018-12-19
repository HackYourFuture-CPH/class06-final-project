/* Database setup & basic functionality. This file could (should!) be modularized in the future. */
const mysql = require('mysql')

const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE
}

const { host, user, password, port, database } = config;

//Create a mysql pool as to not manage connection quite as tediously
const pool = mysql.createPool({
    connectionLimit: 10,
    host,
    port,
    user,
    password,
    database
})

//A method for checking if a certain google id already exists in our database.
pool.getUserFromGoogleId = function (googleID) {
    return new Promise((resolve, reject) => {
        this.query('select * FROM users WHERE google_id = ?',
            [googleID], (err, results, fields) => {

                if (err) reject('Something went wrong in fething a user!' + err)
                resolve(results)
            }
        )
    })
}

//A method for getting he user info out of the ID (our id nr, not the google_id)
pool.getUserFromId = function (id) {
    return new Promise((resolve, reject) => {
        this.query('select * FROM users WHERE id = ?',
            [id], (err, results, fields) => {

                if (err) reject('Something went wrong in fething a user!' + err)
                resolve(results)
            }
        )
    })
}

//A method for creating new users.
pool.createNewUserFromGoogleId = function (googleID, fullName, imgURL) {

    return new Promise((resolve, reject) => {
        this.query('INSERT INTO users (google_id, full_name, img_url) VALUES( ?, ?, ?)',
        [
            googleID,
            fullName,
            imgURL
        ], (error, result) => {
            if (error) reject('Whoops! could not add Google User to DB!' + error)
            resolve(result)
        })
    })
}

module.exports = pool;
