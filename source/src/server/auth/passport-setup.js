const mysql = require('mysql')

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
})

const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy

//serialize or "encrypt" a user into a cookie to send to the client
passport.serializeUser((user, done) => {
  done(null, user.google_id)
})

//deserialize or "decrypt" the cookie into readable information
passport.deserializeUser((id, done) => {
  pool.query(
    'select * FROM users where google_id = ?',
    [id],
    (err, results, fields) => {
      if (err) {
        throw new Error('Something went wrong while retriving a users id!\n' + err)
      } else {
        done(null, results[0])
      }
    }
  )
})

passport.use(
  new GoogleStrategy(
    //Variables sent to the passport stategy set up in a .env file. These varies depending on stategy.
    //You can get these variables from the authentication provider you use such as
    //google twitter facebook or github. As Long as it's OAuth2.0
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK
    },
    (accessToken, refreshToken, profile, done) => {
      //passport callbaack, that uses our mysql database to first check if we already have a user with the unique github_ID
      pool.query(
        'select * FROM users WHERE google_id = ?',
        [profile._json.id],
        async (err, results, fields) => {
          console.log(results)
          if (err) {
            throw new Error('Something went wrong in fething a user!' + err)
          } else if (
            results === undefined ||
            results.length === 0 ||
            results[0].google_id === undefined
          ) {
            //If no user is found with the provided id, create one.
            pool.query(
              'INSERT INTO users (google_id, name, google_login, type, avatar) VALUES( ?, ?, ?, ?, ?)',
              [
                profile._json.id,
                profile._json.name.givenName,
                profile._json.displayName,
                profile._json.kind,
                profile._json.image.url
              ],
              (err, results, fields) => {
                if (err) {
                  throw new Error('Whoops! could not add Google User to DB!' + err)
                } else {
                  const user = {
                    id: results.insertId,
                    avatar: profile._json.image.url,
                    name: profile._json.name.givenName,
                    type: profile._json.kind,
                    google_login: profile._json.displayName,
                    google_id: profile._json.id,
                    role: results[0].rolse_id
                  }
                  //then send to passport.js for serialization the user we just created and tell it that we're done
                  //checking if the user exists
                  done(null, user)
                  return user
                }
              }
            )
          } else {
            //if user already exists and there is no need for a new user send the existing user to passport.js for serialization
            done(null, results[0])
            return results[0]
          }
        }
      )
    }
  )
)
