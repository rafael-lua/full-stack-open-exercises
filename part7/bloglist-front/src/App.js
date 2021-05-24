import React, { useState, useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"

import { removeNotification } from "./reducers/notificationReducer"
import { initializeBlogs } from "./reducers/blogReducer"

import Blog from "./components/Blog"
import blogService from "./services/blogs"

import Login from "./components/Login"
import NewBlog from "./components/NewBlog"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"

function App() {
  const dispatch = useDispatch()

  // Decreases notifications timer
  useEffect(() => {
    setInterval(() => {
      dispatch(removeNotification())
    }, 100)
  }, [removeNotification, dispatch])

  const notification = useSelector((state) => state.notification)
  const blogs = useSelector((state) => state.blogs)
  // const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const togglables = {
    newBlog: useRef()
  }

  const toggleIt = (index) => {
    togglables[index].current.toggleVisibility()
  }

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const authUser = window.localStorage.getItem("blogUserAuth")
    if (authUser) {
      const parsedAuthUser = JSON.parse(authUser)
      setUser(parsedAuthUser)
      blogService.setToken(parsedAuthUser.token)
    }
  }, [])

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem("blogUserAuth")
  }

  const loginSection = () => {
    return (
      <Login
        setUser={setUser}
      />
    )
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
        <div id="main-blog-list">
          <Togglable buttonLabel="New Blog" ref={togglables.newBlog}>
            <NewBlog
              toggleIt={toggleIt}
            />
          </Togglable>

          {blogsFiltered().map((blog) => {
            return (
              <Blog
                key={blog.id}
                blog={blog}
                user={user}
              />
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div>
      {
        (notification.message)
          ? <Notification message={notification.message} type={notification.style} />
          : null
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
