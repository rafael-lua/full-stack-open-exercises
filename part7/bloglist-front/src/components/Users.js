import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Users = () => {
  const users = useSelector((state) => state.users)

  const usersList = () => {
    return (
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map((user) => {
              return (
                <tr key={user.id}>
                  <td><Link to={`/user/${user.id}`}>{ user.name }</Link></td>
                  <td>{ user.blogs.length }</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    )
  }

  return (
    <div>
      <h1>Users</h1>
      {
        (users)
          ? usersList()
          : <p>No users registered.</p>
      }
    </div>
  )
}

export default Users
