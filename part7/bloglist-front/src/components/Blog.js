import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"

import { setNotification } from "../reducers/notificationReducer"
import { likeBlog, deleteBlog, commentBlog } from "../reducers/blogReducer"

import styled from "styled-components"

const BlogBlock = styled.div`
  border: 2px solid rgba(0, 0, 0, 0.05);
  border-radius: 1em;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding: 1em;
`

const HrStyled = styled.div`
  width: 25%;
  height: 2px;
  background-color: rgba(0, 0, 0, 0.9);
  margin: 0.5em 0;
`

const BlogTitle = styled.p`
  margin: 0.25em 0;
  font-size: 1.3em;
`

const BlogAuthor = styled.p`
  font-size: 1em;
  margin: 0.5em 0;
`

const BlogLink = styled.p`
  font-size: 0.9em;
  font-style: italic;
  color: rgba(0, 0, 155, 0.75);
  margin: 0;
`

const BlogLike = styled.p`
  font-size: 1.1em;
  font-weight: 500;
`

const LikeButton = styled.button`
  width: 5em;
  margin: 0 0.5em;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 0.5em;
  outline: none;
  padding: 0.1em 0.5em;
  background-color: rgba(0, 195, 255, 0.1);

  &:hover {
    cursor: pointer;
    background-color: rgba(0, 195, 255, 0.25);
  }
`

const DeleteButton = styled.button`
  width: 5em;
  margin: 0 0.5em;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 0.5em;
  outline: none;
  padding: 0.1em 0.5em;
  background-color: rgba(255, 0, 0, 0.1);
  font-weight: 500;
  font-size: 0.75em;

  &:hover {
    cursor: pointer;
    background-color: rgba(255, 0, 0, 0.25);
  }
`

const CommentInput = styled.input`
  width: 50%;
  border-radius: 0.5em;
  outline: none;
  padding: 0.25em;
  margin: 0 0.5em;
`

const Blog = ({ blog, user }) => {
  const [comment, setcomment] = useState("")
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

  const handleComment = () => {
    dispatch(commentBlog(blog, comment))
    setcomment("")
  }

  const commentId = (comment) => {
    const date = new Date()
    return comment.replace(" ", "") + date.toDateString()
  }

  return (
    <BlogBlock className="blog-block">
      <DeleteButton style={onShowStateDelete} className="blog-delete button-danger" onClick={handleDelete}>Delete</DeleteButton>
      <BlogTitle className="blog-title"><strong>{blog.title}</strong></BlogTitle>
      <HrStyled />
      <BlogLink className="blog-url">{blog.url}</BlogLink>
      <BlogLike className="blog-likes">LIKES: {blog.likes} <LikeButton className="blog-like-button" onClick={handleLike}>Like</LikeButton></BlogLike>
      <BlogAuthor className="blog-author"><em>Added by</em> <strong>{blog.author}</strong></BlogAuthor>
      <h2>Comments</h2>
      <CommentInput type="text" value={comment} onChange={ (e) => {setcomment(e.target.value)}} /><button onClick={handleComment}>Add comment</button>
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
    </BlogBlock>
  )
}

export default Blog