const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const session = require("express-sesssion")

const authRouter = require("./auth/auth-router")
const usersRouter = require("./users/users-router")

const server = express()
const port = process.env.PORT || 5006

server.use(cors())
server.use(helmet())
server.use(express.json())
server.use(session({ // session mw
  resave: false, // keep it false to avoid recreating sessions that have not changed
  saveUninitialized: false, // GDPR agains setting cookies automatically
  secret: "keep it secret, keep it safe!", // tp cryptographically signs the cookie
}))

server.use("/auth", authRouter)
server.use("/users", usersRouter)

server.get("/", (req, res, next) => {
  res.json({
    message: "Welcome to our API",
  })
})

server.use((err, req, res, next) => {
  console.log(err)
  res.status(500).json({
    message: "Something went wrong",
  })
})

server.listen(port, () => {
  console.log(`Running at http://localhost:${port}`)
})