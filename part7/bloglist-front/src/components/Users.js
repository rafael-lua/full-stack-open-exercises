import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import styled from "styled-components"

const TableStyle = styled.table`
  width: 75%;
  border-collapse: collapse;
`

const TableHead = styled.th`
  padding: 0.5em 0;
`

const HrStyled = styled.hr`
  width: 50%;
  margin: 0.25em auto;
`

const TableCol = styled.td`
  text-align: center;
  font-size: 1.05em;
  padding: 0.25em 0;
`

const TableRow = styled.tr`
  background-color: ${(props) => props.odd ? "rgba(0, 0, 0, 0.05)" : "rgba(0, 0, 0, 0)"};
`

const Users = () => {
  const users = useSelector((state) => state.users)

  const usersList = () => {
    return (
      <TableStyle>
        <thead>
          <tr>
            <TableHead>Name<HrStyled /></TableHead>
            <TableHead>Blogs Created<HrStyled /></TableHead>
          </tr>
        </thead>
        <tbody>
          {
            users.map((user, i) => {
              return (
                <TableRow key={user.id} odd={ (i % 2 === 0) ? false : true }>
                  <TableCol><Link to={`/user/${user.id}`}>{ user.name }</Link></TableCol>
                  <TableCol>{ user.blogs.length }</TableCol>
                </TableRow>
              )
            })
          }
        </tbody>
      </TableStyle>
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
