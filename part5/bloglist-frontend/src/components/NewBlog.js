import React, { useState } from "react"
import blogService from "../services/blogs"

const NewBlog = ({ blogs, setBlogs, logger, toggleIt }) => {
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
      toggleIt("newBlog")
      logger({ msg: `Blog ${createdBlog.title} created with success!`, type: "success" })
      setTimeout(() => {logger(null)}, 5000)
    } catch (exception) {
      logger({ msg: "Cannot create new blog. Make sure to fill at least Title and URL fields", type: "error" })
      setTimeout(() => {logger(null)}, 5000)
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
