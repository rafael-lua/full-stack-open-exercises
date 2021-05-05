const blogRoute = require("express").Router()
const Blog = require("../models/blog")

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

blogRoute.post("/", async (req, res, next) => {
  try {
    if (!req.body.title || !req.body.url) {
      res.status(400).json({ error: "Title or url not defined" })
    } else {
      const blog = new Blog(req.body)

      if (!blog.likes) {
        blog.likes = 0
      }

      // temp
      const User = require("../models/user")
      const rootUser = await User.findOne({ username: "root" })
      blog.user = rootUser._id

      const result = await blog.save()
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
    await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = blogRoute