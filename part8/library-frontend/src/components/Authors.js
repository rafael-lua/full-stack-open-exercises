import React from 'react'
import { useQuery } from "@apollo/client"

import SetBirth from "./SetBirth"

import { ALL_AUTHORS } from "../queries"

const Authors = ({ show }) => {
  const authors = useQuery(ALL_AUTHORS, {
    pollInterval: 2000
  })

  if (!show) {
    return null
  } else if (authors.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <SetBirth authors={authors.data.allAuthors} />
    </div>
  )
}

export default Authors
