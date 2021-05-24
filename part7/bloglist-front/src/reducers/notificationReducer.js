const initialState = {
  message: null,
  style: "",
  time: 0
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION": {
      let newState = {
        message: action.msg,
        style: action.style,
        time: 5000
      }
      return newState
    }

    case "REMOVE_NOTIFICATION": {
      let newState = { ...state }
      newState.time -= 100
      if (newState.time <= 0) {
        newState.message = null
        newState.style = ""
        newState.time = 0
      }
      return newState
    }

    default:
      return state
  }
}

export const setNotification = (msg, style) => {
  return {
    type: "SET_NOTIFICATION",
    msg,
    style
  }
}

export const removeNotification = () => {
  return {
    type: "REMOVE_NOTIFICATION"
  }
}

export default reducer