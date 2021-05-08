import React, { useState, useEffect } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"

import Login from "./components/Login"

function App() {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    const getBlogs = async () => {
      const blogsList = await blogService.getAll()
      setBlogs( blogsList )
    }
    getBlogs()
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const authUser = await loginService.login({
        username,
        password
      })
      setUser(authUser)
      setUsername("")
      setPassword("")
    } catch (exception) {
      console.log(exception.message)
    }
  }

  const loginSection = () => {
    return (
      <Login
        handleLogin={handleLogin}
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
      />
    )
  }

  const blogSection = () => {
    return (
      <div>
        <h2>Blogs</h2>
        <h4>Logged as { user.name }</h4>
        {blogs.map((blog) => {
          return <Blog key={blog.id} blog={blog} />
        })}
      </div>
    )
  }

  return (
    <div>
      {
        user === null
          ? loginSection()
          : blogSection()
      }
    </div>
  )
}

export default App
