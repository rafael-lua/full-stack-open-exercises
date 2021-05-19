const initialValue = "Notifications..."

const reducer = (store = initialValue, action) => {
  switch (action.type) {
    case "SET":
      return store

    default:
      return store
  }
}

export default reducer