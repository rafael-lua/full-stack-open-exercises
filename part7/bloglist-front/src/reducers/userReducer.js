import blogService from "../services/blogs"
import loginService from "../services/login"

import { setNotification } from "./notificationReducer"

const reducer = (state = null, action) => {
  switch (action.type) {
    case "GET_STORED_USER": {
      const authUser = window.localStorage.getItem("blogUserAuth")
      if (authUser) {
        const parsedAuthUser = JSON.parse(authUser)
        blogService.setToken(parsedAuthUser.token)
        return parsedAuthUser
      } else {
        blogService.setToken(null)
        return null
      }
    }

    case "SET_USER": {
      blogService.setToken(action.data.token)
      window.localStorage.setItem("blogUserAuth", JSON.stringify(action.data))
      return action.data
    }

    case "UNSET_USER": {
      window.localStorage.removeItem("blogUserAuth")
      return null
    }

    default:
      return state
  }
}

export const getStoredUser = () => {
  return {
    type: "GET_STORED_USER"
  }
}

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const authUser = await loginService.login(credentials)
      dispatch({
        type: "SET_USER",
        data: authUser
      })
    } catch (exception) {
      dispatch(setNotification("Login failed. Are you sure username/password is correct?", "error"))
    }
  }
}

export const logout = () => {
  return {
    type: "UNSET_USER"
  }
}

export default reducer