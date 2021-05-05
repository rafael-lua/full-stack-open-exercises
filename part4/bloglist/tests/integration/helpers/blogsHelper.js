const Blog = require("../../../models/blog")

const initialBlogs = [
  {
    title: "Blog title",
    author: "Blog author",
    url: "myblog.url",
    likes: 0
  },
  {
    title: "Blog title 2",
    author: "Blog author 2",
    url: "myblog2.url",
    likes: 5
  }
]

const blogsInDabatase = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDabatase
}