import React, { useState } from "react"
import { useDispatch } from "react-redux"

import { createBlog } from "../reducers/blogReducer"

const NewBlog = ({ toggleIt }) => {
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
    const newBlog = {
      title,
      author,
      url
    }
    dispatch(createBlog(newBlog))
    toggleIt("newBlog")
  }

  return (
    <div>
      <h3>Create a new blog:</h3>
      <form id="create-blog-form" onSubmit={handleCreateBlog}>
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
