const blogRoute = require("express").Router()
const Blog = require("../models/blog")

blogRoute.get("/", (req, res) => {
  Blog
    .find({})
    .then((blogs) => {
      res.status(200).json(blogs)
    })
})

blogRoute.post("/", (req, res) => {
  const blog = new Blog(req.body)

  blog
    .save()
    .then((result) => {
      res.status(201).json(result)
    })
})

module.exports = blogRoute