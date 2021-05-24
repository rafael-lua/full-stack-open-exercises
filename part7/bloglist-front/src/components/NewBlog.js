import React, { useState } from "react"
import { useDispatch } from "react-redux"

import { setNotification } from "../reducers/notificationReducer"

import blogService from "../services/blogs"

// !!! The handleCreateDebug is a optional function that will take place of handleCreateBlog.
// It exists only for making a unit test exercise in the fullstackOpen course.
const NewBlog = ({ includeBlog, toggleIt, handleCreateDebug }) => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const handleChanges = (type, value) => {
    switch (type) {
      case "title":
        setTitle(value)
        break

      case "author":
        setAuthor(value)
        break

      case "url":
        setUrl(value)
        break

      default:
        break
    }
  }

  const handleCreateBlog = async (e) => {
    e.preventDefault()
    try {
      const newBlog = {
        title,
        author,
        url
      }
      const createdBlog = await blogService.create(newBlog)
      includeBlog(createdBlog)
      toggleIt("newBlog")
      dispatch(setNotification(`Blog ${createdBlog.title} created with success!`, "success"))
    } catch (exception) {
      dispatch(setNotification("Cannot create new blog. Make sure to fill at least Title and URL fields", "error"))
    }
  }

  return (
    <div>
      <h3>Create a new blog:</h3>
      <form id="create-blog-form" onSubmit={handleCreateDebug ? () => handleCreateDebug(title, author, url) : handleCreateBlog}>
        <div>
          Title:
          <input id="create-blog-title" type="text" value={title} onChange={({ target }) => {handleChanges("title", target.value)}} />
        </div>
        <div>
          Author:
          <input id="create-blog-author" type="text" value={author} onChange={({ target }) => {handleChanges("author", target.value)}} />
        </div>
        <div>
          Url:
          <input id="create-blog-url" type="text" value={url} onChange={({ target }) => {handleChanges("url", target.value)}} />
        </div>
        <button id="create-blog-submit" type="submit">Add</button>
      </form>
    </div>
  )
}

export default NewBlog
