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

blogRoute.post("/", (req, res, next) => {
  const blog = new Blog(req.body)

  blog
    .save()
    .then((result) => {
      res.status(201).json(result)
    })
})

module.exports = blogRoute