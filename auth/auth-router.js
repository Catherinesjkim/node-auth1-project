// custom session code with express-session
const express = require("express")
const bcrypt = require("bcryptjs")
const Users = require("./users/users-model")

const router = express.Router()

router.post("register", async (req, res, next) => {
  try {
    const saved = await Users.add(req.body)

    res.status(201).json(saved)
  } catch(err) {
     next(err)
  }
})

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findBy({ username }).first();
    // since bcrypt hashes generate different results due to the salting,
    // we rely on the magic internals to compare hashes (rather than doing
    // it manually by re-hashing and comparing)
    const passwordValid = await bcrypt.compare(password, user.password)

    if (user && passwordValid) {
      // stores the user data in the current session, 
      // so it persists between requests
      req.session.user = user // it's now available in other mw functions, anywhere if it comes after the mw chain
      res.status(200).json({
        message: `Welcome ${user.username}!`,
      })
    } else {
      res.status(401).json({
        message: "Invalid Credentials",
      })
    }
  } catch (err) {
      next(err)
  }
})

router.get("/protect", async (req, res, next) => {
  try {
    if (!req.session || !req.session.user) {
      return res.status(403).json({
        message: "You are not authorized!",
      })
    }

    res.json({
      message: "You are authorized",
    })
  } catch (err) {
     next(err)
  }
})

module.exports = router