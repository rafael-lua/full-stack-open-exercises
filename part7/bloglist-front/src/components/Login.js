import React, { useState } from "react"
import { useDispatch } from "react-redux"

import { setNotification } from "../reducers/notificationReducer"

import blogService from "../services/blogs"
import loginService from "../services/login"
import PropTypes from "prop-types"

const Login = ({ setUser }) => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const authUser = await loginService.login({
        username,
        password
      })
      blogService.setToken(authUser.token)
      window.localStorage.setItem("blogUserAuth", JSON.stringify(authUser))
      setUsername("")
      setPassword("")
      setUser(authUser) // In last because it will cause component update, so it don't throws update unmounted error
    } catch (exception) {
      dispatch(setNotification("Login failed. Are you sure username/password is correct?", "error"))
    }
  }

  return (
    <div>
      <h1>Login into the system</h1>
      <form id="loginForm" onSubmit={handleLogin}>
        <div>
          Username
          <input
            id="login-username"
            type="text"
            name="username"
            onChange={({ target }) => setUsername(target.value)}
            value={username}
          />
        </div>
        <div>
          Password
          <input
            id="login-password"
            type="password"
            name="password"
            onChange={({ target }) => setPassword(target.value)}
            value={password}
          />
        </div>
        <button id="login-submit-button" type="submit">Login</button>
      </form>
    </div>
  )
}

Login.propTypes = {
  setUser: PropTypes.func.isRequired
}

export default Login