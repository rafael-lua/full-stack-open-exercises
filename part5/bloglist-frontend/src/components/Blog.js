import React, { useState } from "react"
import blogService from "../services/blogs"

const Blog = ({ blog, updateBlog }) => {
  const [visible, setVisible] = useState(false)

  const onShowState = { display: visible ? "" : "none" }

  const handleLike = async () => {
    const newLikes = blog.likes + 1
    const updatedBlog = await blogService.update(blog, newLikes)
    updateBlog(updatedBlog)
  }

  return (
    <div className="blog-block">
      <p><strong>{blog.title}</strong> <button onClick={() => {setVisible(!visible)}}>{ visible ? "Hide" : "Show"}</button></p>
      <p style={onShowState}>{blog.url}</p>
      <p style={onShowState}>{blog.likes} <button onClick={handleLike}>Like</button></p>
      <p style={onShowState}>{blog.author}</p>
    </div>
  )
}

export default Blog