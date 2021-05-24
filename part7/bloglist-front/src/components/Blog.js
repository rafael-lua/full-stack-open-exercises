import React, { useState } from "react"
import { useDispatch } from "react-redux"

import { setNotification } from "../reducers/notificationReducer"
import { likeBlog,deleteBlog } from "../reducers/blogReducer"

import PropTypes from "prop-types"

// !!! The handleLikeDebug is a optional function that will take place of handleLike.
// It exists only for making a unit test exercise in the fullstackOpen course.
const Blog = ({ blog, user, handleLikeDebug }) => {
  const dispatch = useDispatch()
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
    dispatch(likeBlog(blog))
  }

  const handleDelete = async () => {
    if (!blog.user) {
      dispatch(setNotification("This blog cannot be deleted!", "error"))
      return
    }

    if (user.username === blog.user.username) {
      const result = window.confirm(`Delete blog: ${blog.title} by ${blog.author ? blog.author : "unkown"}`)
      if (result === true) {
        dispatch(deleteBlog(blog))
      }
    } else {
      dispatch(setNotification("You are not the creator of this blog.", "error"))
    }
  }

  return (
    <div className="blog-block">
      <p className="blog-title"><strong>{blog.title}</strong> <button className="blog-toggle" onClick={() => {setVisible(!visible)}}>{ visible ? "Hide" : "Show"}</button></p>
      <p className="blog-url" style={onShowState}>{blog.url}</p>
      <p className="blog-likes" style={onShowState}>{blog.likes} <button className="blog-like-button" onClick={handleLikeDebug ? handleLikeDebug : handleLike}>Like</button></p>
      <p className="blog-author">{blog.author}</p>
      <button style={onShowStateDelete} className="blog-delete button-danger" onClick={handleDelete}>Delete</button>
    </div>
  )
}

Blog.propTypes = {
  user: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired,
  handleLikeDebug: PropTypes.func
}

export default Blog