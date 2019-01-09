const database = require('../database')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy

//serialize or "encrypt" a user into a cookie to send to the client
passport.serializeUser((user, done) => {
  console.log(user)
  done(null, user.id)
})

//deserialize or "decrypt" the cookie into readable information
passport.deserializeUser((id, done) => {
  database
    .getUserFromId(id)
    .then(results => {
      done(null, results[0])
    })
    .catch(err => {
      throw err
    })
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
      console.log(profile._json)
      //passport callbaack, that uses our mysql database to first check if we already have a user with the unique google_id

      const googleID = profile._json.id
      const fullName = profile._json.displayName
      const imgURL = profile._json.image.url

      database
        .getUserFromGoogleId(googleID)
        .then(results => {
          if (
            results === undefined ||
            results.length === 0 ||
            results[0].google_id === undefined
          ) {
            database
              .createNewUserFromGoogleId(googleID, fullName, imgURL)
              .then(response => {
                database.getUserFromId(response.insertId).then(results => {
                  done(null, results[0])
                  return
                })
                // const user = {
                //   id : response.insertId,
                //   google_id : googleID,
                //   full_name : fullName,
                //   img_url : imgURL
                // }
                // done(null, user);
                // return
              })
          } else {
            console.log('user founded' + results)
            //if user already exists and there is no need for a new user send the existing user to passport.js for serialization
            done(null, results[0])
            return
          }
        })
        .catch(err => {
          throw err
        })
    }
  )
)
