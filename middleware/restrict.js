const bcrypt = require("bcryptjs")
const usersModel = require("../users/users-model")

function restrict() {
  // put in variable so we can re-use it
  const authError = {
    message: "Invalid credentials",
  };

  return async (req, res, next) => {
    try {
      const { username, password } = req.headers
      // make sure the values aren't empty
      if (!username || !password) {
        return res.status(401).json(authError)
      }

      const user = await usersModel.findBy({ username }).first()
      // make sure the user exists
      if (!user) {
        resturn res.status(401).json(authError)
      }

      const passwordValid = await bcrypt.compare(password, user.password)
      // make sure the password is correct
      if (!passwordValid) {
        return res.status(401).json(authError)
      }

      // if we reach this point, the user is authenticatd!
      next();
    } catch (err) {
        next(err)
    }
  }
}