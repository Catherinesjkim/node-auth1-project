const bcrypt = require("bcryptjs")
const db = require("../database/config")

module.exports = {
  add,
  find,
  findBy,
  findById,
}

function find() {
  return db("users")
    .select("id", "username") // important!
}

function findBy(user) {
  return db("users")
    .where(user);
}

async function add(user) {
  try {
  console.log("THIS", user)
  const [id] = await db("users")
    .insert(user, "id")
    
  return findById(id)
  }catch(err) {
    console.log("HERE", err)
  }
}

function findById(id) {
  return db("users")
    .where({ id })
    .first()
}
