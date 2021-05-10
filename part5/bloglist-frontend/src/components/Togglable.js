import React, { useState, useImperativeHandle } from "react"

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const onShowState = { display: visible ? "" : "none" }
  const onHideState = { display: visible ? "none" : "" }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={onHideState}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={onShowState}>
        {props.children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  )
})
Togglable.displayName = "Togglable"

export default Togglable
