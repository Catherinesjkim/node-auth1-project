// pulling data from users' table
// model: collection of functions to interact with the db
// the router doesn't have to do it directly to interact with the db
// Will actually hash the password here
const bcrypt = require("bcryptjs")
const db = require("../database/config")

// bcryptjs will automatically hash our passwords
// before a user gets inserted to our db, their password value will get hashed for us 
async function add(user) {
  // hash the password with a time complexity of 14 - not the number of hash rounds - 1s to 2s to complete
	// hash rounds is 2^14 === 16,384 rounds 
  user.password = await bcrypt.hash(user.password, 14)

  const [id] = await db("users").insert(user)
  return findById(id)
}

function find() {
  return db("users").select("id", "username")
}

function findBy(filter) {
  return db("usres")
    .select("id", "username", "password")
    .where(filter)
}

function findById(id) {
  return db("users")
    .select("id", "username")
    .where({ id })
    .first()
}

module.exports = {
  add, 
  find, 
  findBy, 
  findById
}