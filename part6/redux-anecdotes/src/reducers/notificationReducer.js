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

const timer = (t) => {
  return new Promise(resolve => setTimeout(resolve, t * 1000))
}

// export const setNotification = (msg) => {
//   return {
//     type: "SET_NOTIFICATION",
//     message: msg
//   }
// }

export const setNotification = (msg, wait) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_NOTIFICATION",
      message: msg
    })
    await timer(wait)
    dispatch({
      type: "REMOVE_NOTIFICATION",
      message: msg
    })
  }
}

// export const removeNotification = (msg) => {
//   return {
//     type: "REMOVE_NOTIFICATION",
//     message: msg
//   }
// }

export default reducer