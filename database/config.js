const knex = require("knex")

const knexfile = require("../knexfile")

const environment = process.env.DB_ENV || "development"

const db = knex(knexfile[environment])

module.exports = db