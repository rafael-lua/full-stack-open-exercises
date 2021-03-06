const loginRouter = require("express").Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const config = require("../utils/config")

const User = require("../models/user")

loginRouter.post("/", async (req, res, next) => {
  try {
    const body = req.body

    const user = await User.findOne({ username: body.username })

    const passwordCorrect = (user === null)
      ? false
      : await bcrypt.compare(body.password, user.passwordHash)

    if (!(user && passwordCorrect)) {
      return res.status(401).json({
        error: "invalid username or password"
      })
    }

    const userForToken = {
      username: user.username,
      id: user._id
    }

    const token = jwt.sign(
      userForToken,
      config.SECRET,
      { expiresIn: 60*60 } // One hour expiration
    )

    res.status(200).send({ token, username: user.username, name: user.name })
  } catch (error) {
    next(error)
  }
})

module.exports = loginRouter