import React from "react"

const Login = ({ handleLogin, username, password, setUsername, setPassword }) => {
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