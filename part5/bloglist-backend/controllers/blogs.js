const blogRoute = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")

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
    const body = req.body
    const userAuth = req.user

    if (!userAuth) {
      return res.status(401).json({ error: "Authentication not found or invalid" })
    }

    if (!body.title || !body.url) {
      res.status(400).json({ error: "Title or url not defined" })
    } else {
      const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: !body.likes ? 0 : body.likes,
        user: userAuth.id
      })

      const result = await blog.save()

      const user = await User.findById(userAuth.id)
      user.blogs = user.blogs.concat(result._id)
      await user.save()

      const populatedResult = await Blog.findOne(result._id).populate("user", { username: 1, name: 1 })

      res.status(201).json(populatedResult)
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
    const userAuth = req.user

    if (!userAuth) {
      return res.status(401).json({ error: "Authentication not found or invalid" })
    }

    const blog = await Blog.findById(req.params.id)
    if (userAuth.id !== blog.user.toString()) {
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