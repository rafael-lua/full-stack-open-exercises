const initialValue = ""

const reducer = (state = initialValue, action) => {
  switch (action.type) {
    case "SET_FILTER": {
      const newState = action.value
      return newState
    }

    default:
      return state
  }
}

export const setFilter = (value) => {
  return {
    type: "SET_FILTER",
    value
  }
}

export default reducer