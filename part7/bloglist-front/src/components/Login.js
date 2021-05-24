import React, { useState } from "react"
import { useDispatch } from "react-redux"

import { login } from "../reducers/userReducer"

const Login = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()

    dispatch(login({
      username,
      password
    }))

    setUsername("")
    setPassword("")
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

export default Login