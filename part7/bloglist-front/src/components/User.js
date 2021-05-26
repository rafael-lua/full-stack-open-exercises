import React from "react"

const User = ({ user }) => {
  if (!user) {
    return null
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <h3>added blogs</h3>
      <ul>
        {
          user.blogs.map((blog) => {
            return (
              <li key={blog.id}>{ blog.title }</li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default User
