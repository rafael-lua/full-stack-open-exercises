const blogRoute = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const config = require("../utils/config")

blogRoute.get("/", async (req, res, next) => {
  try {
    const blogs = await Blog
      .find({})
      .populate("user", { username: 1, name: 1 })
    res.status(200).json(blogs)
  } catch (error) {
    next(error)
  }
})

// const getTokenFrom = (req) => {
//   const auth = req.get("authorization")
//   if (auth && auth.toLowerCase().startsWith("bearer ")) {
//     return auth.substring(7)
//   }
//   return null
// }

blogRoute.post("/", async (req, res, next) => {
  try {
    const body = req.body
    const decodedToken = jwt.verify(body.token, config.SECRET)

    if (!body.token || !decodedToken.id) { return res.status(401).json({ error: "Authentication not found or invalid" }) }

    if (!body.title || !body.url) {
      res.status(400).json({ error: "Title or url not defined" })
    } else {
      const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: !body.likes ? 0 : body.likes,
        user: decodedToken.id
      })

      const result = await blog.save()

      const user = await User.findById(decodedToken.id)
      user.blogs = user.blogs.concat(result._id)
      await user.save()

      res.status(201).json(result)
    }
  } catch (error) {
    next(error)
  }
})

blogRoute.put("/:id", async (req, res, next) => {
  try {
    if (!req.body.likes) {
      return res.status(400).json({ error: "Empty likes parameter" })
    }

    const blog = {
      likes: req.body.likes
    }

    const opt = {
      runValidators: true,
      new: true
    }

    const updatedPerson = await Blog.findByIdAndUpdate(req.params.id, blog, opt)
    res.status(200).json(updatedPerson)
  } catch (error) {
    next(error)
  }
})

blogRoute.delete("/:id", async (req, res, next) => {
  try {
    const body = req.body
    const decodedToken = jwt.verify(body.token, config.SECRET)

    if (!body.token || !decodedToken.id) {
      return res.status(401).json({ error: "Authentication not found or invalid" })
    }

    const blog = await Blog.findById(req.params.id)
    if (decodedToken.id !== blog.user.toString()) {
      return res.status(401).json({ error: "You don't have permission to delete this blog" })
    } else {
      await blog.delete()
      res.status(204).end()
    }

  } catch (error) {
    next(error)
  }
})

module.exports = blogRoute