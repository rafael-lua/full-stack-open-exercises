import React, { useState, useImperativeHandle } from "react"
import PropTypes from "prop-types"

import styled from "styled-components"

const StyledButton = styled.button`
  width: 15%;
  margin: 0 0.5em;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 0.5em;
  outline: none;
  padding: 0.25em 0.5em;
  background-color: rgba(100, 100, 0, 0.1);

  &:hover {
    cursor: pointer;
    background-color: rgba(100, 100, 0, 0.25);
  }
`

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
        <StyledButton onClick={toggleVisibility}>{props.buttonLabel}</StyledButton>
      </div>
      <div style={onShowState}>
        {props.children}
        <StyledButton onClick={toggleVisibility}>Cancel</StyledButton>
      </div>
    </div>
  )
})
Togglable.displayName = "Togglable"

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable
