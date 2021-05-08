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

  useEffect(() => {
    const authUser = window.localStorage.getItem("blogUserAuth")
    if (authUser) {
      const parsedAuthUser = JSON.parse(authUser)
      setUser(parsedAuthUser)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const authUser = await loginService.login({
        username,
        password
      })
      setUser(authUser)

      window.localStorage.setItem("blogUserAuth", JSON.stringify(authUser))

      setUsername("")
      setPassword("")
    } catch (exception) {
      console.log(exception.message)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem("blogUserAuth")
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
        <div>
          <h4>Logged as {user.name}</h4>
          <input type="button" onClick={handleLogout} value="Logout"/>
        </div>
        <br />
        <div>
          {blogs.map((blog) => {
            return <Blog key={blog.id} blog={blog} />
          })}
        </div>
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
