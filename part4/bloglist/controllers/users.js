const userRouter = require("express").Router()
const bcrypt = require("bcrypt")
const User = require("../models/user")

userRouter.get("/", async (req, res, next) => {
  try {
    const users = await User
      .find({})
      .populate("blogs", { url: 1, title: 1, author: 1 })
    res.json(users)
  } catch (error) {
    next(error)
  }
})

userRouter.post("/", async (req, res, next) => {
  try {
    const body = req.body

    if (!(body.username && body.password)) {
      return res.status(400).json({
        error: "Missing information"
      })
    } else if (body.password.length < 3) {
      return res.status(400).json({
        error: "Data is invalid"
      })
    }

    if (!body.name) {
      body.name = "Choose a username"
    }

    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(body.password, saltRounds)

    const newUser = new User({
      username: body.username,
      passwordHash: hashedPassword,
      name: body.name
    })

    const savedUser = await newUser.save()
    res.status(201).json(savedUser)
  } catch (error) {
    next(error)
  }
})

module.exports = userRouter