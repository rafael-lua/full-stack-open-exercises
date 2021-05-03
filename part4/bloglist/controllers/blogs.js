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
    const blog = new Blog(req.body)
    const result = await blog.save()
    res.status(201).json(result)
  } catch (error) {
    next(error)
  }
})

module.exports = blogRoute