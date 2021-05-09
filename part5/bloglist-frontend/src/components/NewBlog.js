import React, { useState } from "react"
import blogService from "../services/blogs"

const NewBlog = ({ blogs, setBlogs }) => {
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
      setBlogs([...blogs, createdBlog])
    } catch (exception) {
      console.log(exception.message)
    }
  }

  return (
    <div>
      <h3>Create a new blog:</h3>
      <form onSubmit={handleCreateBlog}>
        <div>
          Title:
          <input type="text" value={title} onChange={({ target }) => {handleChanges("title", target.value)}} />
        </div>
        <div>
          Author:
          <input type="text" value={author} onChange={({ target }) => {handleChanges("author", target.value)}} />
        </div>
        <div>
          Url:
          <input type="text" value={url} onChange={({ target }) => {handleChanges("url", target.value)}} />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default NewBlog
