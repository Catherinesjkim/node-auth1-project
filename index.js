require("dotenv").config()
const server = require('./server')

const port = process.env.PORT || 5015
server.listen(port, () => {
  console.log(`\n** Running at http://localhost:${port} **\n`)
})