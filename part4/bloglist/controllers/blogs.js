const blogRoute = require("express").Router()
const Blog = require("../models/blog")

blogRoute.get("/", async (req, res, next) => {
  try {
    const blogs = await Blog.find({})
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

      const result = await blog.save()
      res.status(201).json(result)
    }
  } catch (error) {
    next(error)
  }
})

module.exports = blogRoute