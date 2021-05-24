import React from "react"

const Notification = ({ type, message }) => {
  return (
    <div className={ type === "error" ? "alert-danger" : "alert-success" }>
      {message}
    </div>
  )
}

export default Notification
