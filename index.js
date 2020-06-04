require("dotenv").config()
const server = require('./api/server')

const port = process.env.PORT || 5006
server.listen(port, () => {
  console.log(`\n** Running at http://localhost:${port} **\n`)
})