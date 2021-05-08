import React, { useState, useEffect } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"

function App() {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    const getBlogs = async () => {
      const blogsList = await blogService.getAll()
      setBlogs( blogsList )
    }
    getBlogs()
  }, [])

  return (
    <div>
      <h2>Blogs</h2>
      {blogs.map((blog) => {
        return <Blog key={blog.id} blog={blog} />
      })}
    </div>
  )
}

export default App
