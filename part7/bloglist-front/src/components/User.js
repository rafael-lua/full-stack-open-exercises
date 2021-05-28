import React from "react"

import styled from "styled-components"

const UserBlock = styled.div`
  border: 2px solid rgba(0, 0, 0, 0.05);
  border-radius: 1em;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding: 1em;
`

const User = ({ user }) => {
  if (!user) {
    return null
  }

  return (
    <UserBlock>
      <h1>{user.name}</h1>
      <h3><em>Added Blogs</em></h3>
      <ul>
        {
          user.blogs.map((blog) => {
            return (
              <li key={blog.id}>{ blog.title }</li>
            )
          })
        }
      </ul>
    </UserBlock>
  )
}

export default User
