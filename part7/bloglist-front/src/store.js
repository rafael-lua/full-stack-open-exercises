import { createStore, combineReducers } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"

import notificationReducer from "./reducers/notificationReducer"

const reducer = combineReducers({
  notification: notificationReducer
})

export default createStore(
  reducer,
  composeWithDevTools()
)