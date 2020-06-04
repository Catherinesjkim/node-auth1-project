const router = require("express").Router()
// const restricted = require("../middleware/restrict")
const Users = require("./users-model")

// needs correct username and password to access this endpoint
router.get("/", (req, res) => {
  Users.find()
    .then((users) => {
      res.status(200).json(users)
    })
    .catch((err) => {
      res.status(500).json({ message: "Error retrieving users", err });
    });
});

module.exports = router