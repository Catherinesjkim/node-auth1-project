// custom session code with express-session - express router
const bcrypt = require("bcryptjs")

const router = require("express").Router()

const Users = require("../users/users-model") // to intecract with users db

// endpoint /api/users
router.get("/", (req, res) => {
  Users.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json({ message: "error retrieving users", err });
    });
});


// endpoint /auth/ - worked on postman
router.post("/register", async (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 8);

  user.password = hash;
  console.log(user);

  try {
    const newUser = await Users.add(user)
    console.log(newUser)
    res.status(201).json(newUser)
  } catch(err) {
     res.status(500).json({ message: "error from the server", err })
  }
});

// endpoint /auth/ - worked on postman
router.post("/login", (req, res) => {
  const { username, password } = req.body

  Users.findBy({ username })
    .then(([user]) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = username
        res.status(200).json({ message: `Welcome ${username}`})
      } else {
        res.status(401).json({ message: "Invalid Login" })
      }
    }).catch(err => {
      res.status(500).json({ message: "Error logging in", err })
    }) 
})

// worked on postman
router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
      if(err) {
        res.send("Unable to logout")
      } else {
        res.send("You are now logged out")
      }
    }) 
})

module.exports = router

