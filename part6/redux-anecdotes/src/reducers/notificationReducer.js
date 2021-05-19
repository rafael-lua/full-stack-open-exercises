const initialValue = {
  message: "",
  visible: false
}

const reducer = (state = initialValue, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION": {
      let newState = { ...state }
      newState.message = action.message
      newState.visible = true
      return newState
    }

    case "REMOVE_NOTIFICATION": {
      const isTheCurrentMessage = !(action.message === state.message)
      return { ...state, visible: isTheCurrentMessage }
    }


    default:
      return state
  }
}

export const setNotification = (msg) => {
  return {
    type: "SET_NOTIFICATION",
    message: msg
  }
}

export const removeNotification = (msg) => {
  return {
    type: "REMOVE_NOTIFICATION",
    message: msg
  }
}

export default reducer