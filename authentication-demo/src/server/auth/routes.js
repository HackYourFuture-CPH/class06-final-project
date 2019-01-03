const router = require('express').Router()
const passport = require('passport')

/*
 * This acts as an axpress middleware that checks the client request
 * if it already has a cookie and if it's valid, it then
 * either passes the valid request to the next express function E.G where we write (req, res).
 * If there is no cookie that means the user is not signed in at we return a false result so we can easier work
 * with the result in react.
 */
const authCheck = (req, res, next) => {
  if (!req.user) {
    const user = { result: false }
    res.json(user)
  } else {
    next()
  }
}

/*
 * This route tells passport.js that when the hit the localhost:9001/auth/github endpoint
 * we want to authenticate with the github strategy, and what scope we want.
 * The scope is what information and what we want to be able to do with the authenticated profile.
 * In this example I only ask for publically available information with read acess only
 * this could easily be changed to acess a slew of diffrent information depending on,
 * what is needed and what the individual authentication provider provides.
 */
router.get('/github', passport.authenticate('github', { scope: ['profile'] }))

/*
 * This route logs out the user and strips the "logged in" information from their cookie
 */
router.get('/github/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

/*
 * This get's called when a user is signed in and when we try to verify if their signed in.
 * It checks if the cookie is valid and then redirects to home path.
 */
router.get('/github/redirect', passport.authenticate('github'), (req, res) => {
  res.redirect('/')
})

module.exports = { router, authCheck }
