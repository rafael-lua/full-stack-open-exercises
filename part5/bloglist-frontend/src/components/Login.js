import React, { useState } from "react"
import blogService from "../services/blogs"
import loginService from "../services/login"

const Login = ({ setUser, logger }) => {
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
      logger({ msg: "Login failed. Are you sure username/password is correct?", type: "error" })
      setTimeout(() => {logger(null)}, 5000)
    }
  }

  return (
    <div>
      <h1>Login into the system</h1>
      <form onSubmit={handleLogin}>
        <div>
          Username
          <input
            type="text"
            name="username"
            onChange={({ target }) => setUsername(target.value)}
            value={username}
          />
        </div>
        <div>
          Password
          <input
            type="password"
            name="password"
            onChange={({ target }) => setPassword(target.value)}
            value={password}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login