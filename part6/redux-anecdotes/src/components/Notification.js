import React from "react"
// import { useSelector } from "react-redux"
import { connect } from "react-redux"

const Notification = ({ message, visible }) => {
  // const notification = useSelector((store) => store.notification)

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1
  }

  if (visible === true) {
    return (
      <div style={style}>
        {message}
      </div>
    )
  }

  return (
    <></>
  )
}

const mapStateToProps = (state) => {
  return {
    message: state.notification.message,
    visible: state.notification.visible
  }
}

const ConnectedNotificaton = connect(mapStateToProps)(Notification)

export default ConnectedNotificaton