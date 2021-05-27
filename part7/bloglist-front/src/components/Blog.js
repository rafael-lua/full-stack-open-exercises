import React from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"

import { setNotification } from "../reducers/notificationReducer"
import { likeBlog, deleteBlog } from "../reducers/blogReducer"

const Blog = ({ blog, user }) => {
  const history = useHistory()
  const dispatch = useDispatch()

  if (!blog || !user) {
    return null
  }

  const isCreator = () => {
    if (blog.user) {
      return user.username === blog.user.username
    } else {
      return false
    }
  }
  const onShowStateDelete = { display: isCreator() ? "" : "none" }

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
        history.push("/")
      }
    } else {
      dispatch(setNotification("You are not the creator of this blog.", "error"))
    }
  }

  const commentId = (comment) => {
    const date = new Date()
    return comment.replace(" ", "") + date.toDateString()
  }

  return (
    <div className="blog-block">
      <p className="blog-title"><strong>{blog.title}</strong></p>
      <p className="blog-url">{blog.url}</p>
      <p className="blog-likes">likes: {blog.likes} <button className="blog-like-button" onClick={handleLike}>Like</button></p>
      <p className="blog-author">added by {blog.author}</p>
      <button style={onShowStateDelete} className="blog-delete button-danger" onClick={handleDelete}>Delete</button>
      <h2>comments</h2>
      <ul>
        {
          (blog.comments && blog.comments.length > 0)
            ? blog.comments.map((comment) => {
              return (
                <li key={commentId(comment)}>{ comment }</li>
              )
            })
            : <p>No comments yet...</p>
        }
      </ul>
    </div>
  )
}

export default Blog