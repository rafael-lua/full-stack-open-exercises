import React, { useState } from "react"
import blogService from "../services/blogs"
import PropTypes from "prop-types"

const Blog = ({ blog, updateBlog, user, logger, excludeBlog }) => {
  const [visible, setVisible] = useState(false)

  const onShowState = { display: visible ? "" : "none" }

  const isCreator = () => {
    if (blog.user) {
      return user.username === blog.user.username
    } else {
      return false
    }
  }
  const onShowStateDelete = { display: (visible && isCreator()) ? "" : "none" }

  const handleLike = async () => {
    const newLikes = blog.likes + 1
    const updatedBlog = await blogService.update(blog, newLikes)
    updateBlog(updatedBlog)
  }

  const handleDelete = async () => {
    if (!blog.user) {
      logger({ msg: "This blog cannot be deleted!", type: "error" })
      setTimeout(() => { logger(null) }, 5000)
      return
    }

    if (user.username === blog.user.username) {
      const result = window.confirm(`Delete blog: ${blog.title} by ${blog.author ? blog.author : "unkown"}`)
      if(result === true){
        await blogService.remove(blog.id)
        excludeBlog(blog)
      }
    } else {
      logger({ msg: "You are not the creator of this blog.", type: "error" })
      setTimeout(() => { logger(null) }, 5000)
    }
  }

  return (
    <div className="blog-block">
      <p className="blog-title"><strong>{blog.title}</strong> <button className="blog-toggle" onClick={() => {setVisible(!visible)}}>{ visible ? "Hide" : "Show"}</button></p>
      <p className="blog-url" style={onShowState}>{blog.url}</p>
      <p className="blog-likes" style={onShowState}>{blog.likes} <button onClick={handleLike}>Like</button></p>
      <p className="blog-author">{blog.author}</p>
      <button style={onShowStateDelete} className="button-danger" onClick={handleDelete}>Delete</button>
    </div>
  )
}

Blog.propTypes = {
  user: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  excludeBlog: PropTypes.func.isRequired,
  logger: PropTypes.func.isRequired
}

export default Blog