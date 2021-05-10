import React, { useState } from "react"

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const onShowState = { display: visible ? "" : "none" }

  return (
    <div className="blog-block">
      <p><strong>{blog.title}</strong> <button onClick={() => {setVisible(!visible)}}>{ visible ? "Hide" : "Show"}</button></p>
      <p style={onShowState}>{blog.url}</p>
      <p style={onShowState}>{blog.likes} <button>Like</button></p>
      <p style={onShowState}>{blog.author}</p>
    </div>
  )
}

export default Blog