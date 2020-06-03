const express = require("express")
const Users = require("./users-model")
const bcrypt = require("bcryptjs")

const router = express.Router()

/*
* Create a mw function that restricts the 
* GET /api/users route to authorized users only.
* It should get the username and password from the 
* request headers. 
*/

function restricted() {
  const authError = {
    message: "Invalid credentials",
  }

return async (req, res, next) => {
  try {
    const { username, password } = req.headers // data came through and it's correct
    if (!username || !password) {
      return res.status(401).json(authError)
    }

    // pull the user from db by username - validated that the user exists in db
    const user = await Users.findBy({ username }).first()
    if (!user) {
      return res.status(401).json(authError)
    }

    // validate the hash
    const passwordValid = await bcrypt.compare(password, user.password) // comparing text against the hash
    if (!passwordValid) {
      return res.status(401).json(authError)
    }

      // if we reached this point, the user is authenticated!
      next() // move on to the next function
    } catch (err) {
        next(err) // if there was an error, call next with error 500 message in index.js
    }
  }
}

// needs correct username and password to access this endpoint
router.get("/", restricted(), async (req, res, next) => {
  try {
    const users = await Users.find()

    res.json(users)
  } catch(err) {
      next(err)
  }
})

module.exports = router