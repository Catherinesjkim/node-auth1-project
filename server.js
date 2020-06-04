const express = require("express")
const helmet = require("helmet")
const cors = require("cors")

const session = require("express-session")
const restricted = require("./middleware/restrict")
const knexSessionStore = require("connect-session-knex")(session)

const usersRouter = require("./users/users-router")
const authRouter = require("./auth/auth-router")

const server = express()

const sessionConfig = {
  name: "user-session",
  secret: "secretsecret",
  cookie: {
    maxAge: 3600 * 1000,
    secure: false,
    httpOnly: true,
  },
  resave: false,
  saveUninitialized: false,

  store: new knexSessionStore({
    knex: require("./database/config"),
    tablename: "sessions",
    sidfieldname: "sid",
    createtable: true,
    clearInterval: 3600 * 1000,
  }),
};

server.use(helmet())
server.use(express.json())
server.use(cors())
server.use(session(sessionConfig))

server.use("/users", restricted, usersRouter)
server.use("/auth", authRouter)

server.get("/", (req, res) => {
  res.json({ api: "API is up" })
})

module.exports = server
