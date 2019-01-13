//Initializes dot files so we can use dotenv
require('dotenv').config({ path: '../../.env' })
const express = require('express')
const authRouter = require('./auth/routes.js')
const path = require('path')
// Even though we don't use this variable anywhere, if it's not required the authentication dosen't work.
// I'll get back to it and figure it out.
// eslint-disable-next-line no-unused-vars
const passportSetup = require('./auth/passport-setup')
const cookieSession = require('cookie-session')
const passport = require('passport')
const port = process.env.PORT || 9001
const buildPath = path.join(__dirname, '../../build')
const app = express()
app.use(express.static(buildPath))
//Here we set the lifetime of the cookie and the encryption string which can be any string you can think of.
app.use(
  cookieSession({
    maxAge: 7 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
  })
)

// Then we initialize passport and start the sessions.
app.use(passport.initialize())
app.use(passport.session())
/*
 * Here we make sure that every route that comes from the router.js file start with /auth,
 * to make it easialy distinguishable from other routes.
 */
app.use('/auth', authRouter.router)

/*
 * Here we check the cookie if the cookie is valid with the middleware we wrote,
 * then we send the information back if it's vaild and we send nothing back if it's not.
 * we could send back json with information that the request was invalid if we wanted to
 * do anything in react to display this.
 */
app.post('/api/profile', authRouter.authCheck, (req, res) => {
  res.send(req.user)
})

/*
 * This is the catch all route to send the app to the browser on the first ping.
 */
app.get('/*', (req, res) => {
  const indexPath = path.join(buildPath, 'index.html')
  res.sendFile(indexPath)
})

app.listen(port, () => {
  console.log(`app being served on port ${port}`)
})
