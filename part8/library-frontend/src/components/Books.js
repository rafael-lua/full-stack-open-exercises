import React, { useState, useEffect, useCallback } from 'react'
import { useQuery } from "@apollo/client"

import { ALL_BOOKS } from "../queries"

const Books = ({ show }) => {
  const [genres, setGenres] = useState([])
  const [filterGenre, setFilterGenre] = useState(null)

  const books = useQuery(ALL_BOOKS, {
    pollInterval: 2000
  })

  const setGenresCallback = useCallback((g) => {
    setGenres(g)
  }, [])

  useEffect(() => {
    if (books.data) {
      let genresList = []
      const checkGenreAndInsert = (book) => {
        book.genres.forEach((genre) => {
          if (!genresList.includes(genre)) {
            genresList = genresList.concat(genre)
          }
        })
      }
      books.data.allBooks.forEach(checkGenreAndInsert)
      setGenresCallback(genresList)
    }
  }, [books.data, setGenresCallback])

  const filterBy = (g) => {
    setFilterGenre(g)
  }

  const filteredBooks = () => {
    let boosPerGenre = [...books.data.allBooks]

    if (filterGenre) {
      boosPerGenre = boosPerGenre.filter((book) => book.genres.includes(filterGenre))
    }

    return (
      boosPerGenre.map(a =>
        <tr key={a.title}>
          <td>{a.title}</td>
          <td>{a.author.name}</td>
          <td>{a.published}</td>
        </tr>
      )
    )
  }

  if (!show) {
    return null
  } else if (books.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>books</h2>
      <p>in genre: <strong>{ filterGenre ? filterGenre : "all"}</strong></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {filteredBooks()}
        </tbody>
      </table>
      <button onClick={() => {filterBy(null)}}>all genres</button>
      {
        genres
          ? genres.map((genre) => {
            return <button key={genre} onClick={() => {filterBy(genre)}}>{ genre }</button>
          })
          : null
      }
    </div>
  )
}

export default Books