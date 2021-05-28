import React, { useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  Route,
  Switch,
  useHistory,
  useRouteMatch,
  Link,
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

import styled from "styled-components"

const MainDiv = styled.div`
  max-width: 1200px;
  padding: 0.5em 1em;
  margin: 0 auto;
`

const MainNav = styled.nav`
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 0.5em;
  padding: 0.5em 1em;
  display: flex;
  justify-content: space-between;

  .nav-item {
    margin: 0 1em;
    text-transform: uppercase;
    text-decoration: none;
    color: rgba(0, 0, 155, 0.5);
    font-weight: 500;

    &:hover {
      font-weight: bold;
    }
  }
  
  .nav-status {
    margin: 0;
  }
`

const InputButton = styled.input`
  margin: 0 0.5em;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 0.5em;
  outline: none;
  padding: 0.25em 0.5em;
  background-color: rgba(255, 0, 0, 0.1);

  &:hover {
    cursor: pointer;
    background-color: rgba(255, 0, 0, 0.25);
  }
`

const LinkStyled = styled(Link)`
  font-size: 1.2em;
  font-weight: 500;
  text-decoration: none;

  & p {
    margin: 0.25em 0;
    padding: 0.25em 0.5em;
    border-radius: 0.5em;
  }

  & p:hover {
    font-weight: bold;
    padding-left: 0.75em;
    background-color: rgba(0, 0, 0, 0.05);
  }

  & p:active {
    color: rgba(0, 55, 0, 0.5);
    font-style: italic;
  }
`

function App() {
  const dispatch = useDispatch()
  const history = useHistory()

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
    history.push("/")
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
        <MainNav>
          <div>
            <Link to="/blogs" className="nav-item">blogs</Link>
            <Link to="/users" className="nav-item">users</Link>
          </div>
          <p className="nav-status">
            <em>Logged as <strong>{user.name}</strong></em>
            <InputButton type="button" onClick={handleLogout} value="Logout" />
          </p>
        </MainNav>
        <h2>BLOGS APP</h2>
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
          <hr></hr>
          {blogsFiltered().map((blog) => {
            return (
              <LinkStyled key={blog.id} to={`/blog/${blog.id}`}>
                <p>{ blog.title }</p>
              </LinkStyled>
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

  const matchBlog = useRouteMatch("/blog/:id")
  const matchedBlog = (matchBlog)
    ? blogs.find((blog) => blog.id === matchBlog.params.id)
    : null

  return (
    <MainDiv>
      {
        (notification.message)
          ? <Notification message={notification.message} type={notification.style} />
          : null
      }
      {
        user === null
          ? <Login />
          : blogSection()
      }
      <Switch>
        <Route path="/blog/:id">
          <Blog user={user} blog={matchedBlog} />
        </Route>
        <Route path="/user/:id">
          <User user={matchedUser} />
        </Route>
        <Route path="/users">
          {
            user === null
              ? null
              : <Users />
          }
        </Route>
        <Route path="/">
          {
            user === null
              ? null
              : blogList()
          }
        </Route>
      </Switch>
    </MainDiv>
  )
}

export default App
