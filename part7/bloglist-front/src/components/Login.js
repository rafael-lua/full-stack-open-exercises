import React, { useState } from "react"
import { useDispatch } from "react-redux"

import { login } from "../reducers/loginReducer"

import styled from "styled-components"

const LoginTitle = styled.h1`
  font-weight: bold;
  text-transform: uppercase;
  margin: 0.25em 0;
  text-align: center;
`
const HrStyled = styled.hr`
  width: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  margin: 0.75em auto;
`

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 1em;
  width: 100%;
`

const InputControl = styled.div`
  display: flex;
`

const InputLabel = styled.label`
  font-size: 1.1em;
  font-weight: 500;
  font-style: italic;
  width: 5em;
`

const InputStyled = styled.input`
  margin: 0 0.5em;
`

const LoginButton = styled.button`
  width: 15%;
  margin: 0 0.5em;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 0.5em;
  outline: none;
  padding: 0.25em 0.5em;
  background-color: rgba(0, 255, 0, 0.1);

  &:hover {
    cursor: pointer;
    background-color: rgba(0, 255, 0, 0.25);
  }
`

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
      <LoginTitle>Login into the system</LoginTitle>
      <HrStyled />
      <LoginForm id="loginForm" onSubmit={handleLogin}>
        <InputControl>
          <InputLabel htmlFor="username">Username</InputLabel>
          <InputStyled
            id="login-username"
            type="text"
            name="username"
            onChange={({ target }) => setUsername(target.value)}
            value={username}
          />
        </InputControl>
        <InputControl>
          <InputLabel htmlFor="password">Password</InputLabel>
          <InputStyled
            id="login-password"
            type="password"
            name="password"
            onChange={({ target }) => setPassword(target.value)}
            value={password}
          />
        </InputControl>
        <LoginButton id="login-submit-button" type="submit">Login</LoginButton>
      </LoginForm>
    </div>
  )
}

export default Login