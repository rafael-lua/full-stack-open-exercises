import React, { useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  Route,
  Switch,
  useRouteMatch
} from "react-router-dom"

import { removeNotification } from "./reducers/notificationReducer"
import { initializeBlogs } from "./reducers/blogReducer"
import { initializeUsers } from "./reducers/userReducer"
import { getStoredUser, logout } from "./reducers/loginReducer"

import Blog from "./components/Blog"
import Users from "./components/Users"
import User from "./components/User"

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
  const user = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)

  const togglables = {
    newBlog: useRef()
  }

  const toggleIt = (index) => {
    togglables[index].current.toggleVisibility()
  }

  useEffect(() => {
    dispatch(initializeUsers())
    dispatch(initializeBlogs())
    dispatch(getStoredUser())
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logout())
  }

  const loginSection = () => {
    return (
      <Login />
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
      </div>
    )
  }

  const blogList = () => {
    return (
      <div>
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

  const matchUser = useRouteMatch("/user/:id")
  const matchedUser = (matchUser)
    ? users.find((user) => user.id === matchUser.params.id)
    : null

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
      <Switch>
        <Route path="/user/:id">
          <User user={matchedUser} />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          {blogList()}
        </Route>
      </Switch>
    </div>
  )
}

export default App
