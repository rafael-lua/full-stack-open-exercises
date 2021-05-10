import React, { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"

import Login from "./components/Login"
import NewBlog from "./components/NewBlog"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"

function App() {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [notification, setNotification] = useState(null)

  const togglables = {
    newBlog: useRef()
  }

  const toggleIt = (index) => {
    togglables[index].current.toggleVisibility()
  }

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
      blogService.setToken(parsedAuthUser.token)
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
      blogService.setToken(authUser.token)

      window.localStorage.setItem("blogUserAuth", JSON.stringify(authUser))

      setUsername("")
      setPassword("")
    } catch (exception) {
      setNotification({ msg: "Login failed. Are you sure username/password is correct?", type: "error" })
      setTimeout(() => {setNotification(null)}, 5000)
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

  const includeBlog = (createdBlog) => {
    setBlogs([...blogs, createdBlog])
  }

  const updateBlog = (updatedBlog) => {
    const updatedBlogs = blogs.map((b) => {
      return b.id === updatedBlog.id ? updatedBlog : b
    })
    setBlogs([...updatedBlogs])
  }

  const blogsFiltered = () => {
    const blogsToFilter = [...blogs]
    blogsToFilter.sort((a, b) => {
      return a.likes > b.likes
        ? -1
        : a.likes < b.likes
          ? 1
          : 0
    })
    return blogsToFilter
  }

  const blogSection = () => {
    return (
      <div>
        <h2>Blogs</h2>
        <div>
          <h4>
            Logged as {user.name}
            <input type="button" onClick={handleLogout} value="Logout" />
          </h4>
        </div>
        <div>
          <Togglable buttonLabel="New Blog" ref={togglables.newBlog}>
            <NewBlog
              includeBlog={includeBlog}
              logger={setNotification}
              toggleIt={toggleIt}
            />
          </Togglable>

          {blogsFiltered().map((blog) => {
            return <Blog key={blog.id} blog={blog} updateBlog={updateBlog} />
          })}
        </div>
      </div>
    )
  }

  return (
    <div>
      {
        !notification
          ? null
          : <Notification message={notification.msg} type={notification.type} />
      }
      {
        user === null
          ? loginSection()
          : blogSection()
      }
    </div>
  )
}

export default App
