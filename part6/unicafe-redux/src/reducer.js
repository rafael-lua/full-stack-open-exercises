const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case "GOOD": {
      let newState = { ...state }
      newState.good += 1
      return newState
    }
    case "OK": {
      let newState = { ...state }
      newState.ok += 1
      return newState
    }
    case "BAD": {
      let newState = { ...state }
      newState.bad += 1
      return newState
    }
    case "ZERO": {
      let newState = { ...state }
      newState.good = 0
      newState.ok = 0
      newState.bad = 0
      return newState
    }
    default: return state
  }

}

export default counterReducer