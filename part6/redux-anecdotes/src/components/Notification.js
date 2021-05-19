import React from "react"
import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector((store) => store.notification)

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1
  }

  if (notification.visible === true) {
    return (
      <div style={style}>
        {notification.message}
      </div>
    )
  }

  return (
    <></>
  )
}

export default Notification