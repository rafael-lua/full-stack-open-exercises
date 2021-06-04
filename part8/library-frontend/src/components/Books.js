import React, { useState, useEffect, useCallback } from 'react'
import { useQuery, useLazyQuery } from "@apollo/client"

import { ALL_BOOKS } from "../queries"

const Books = ({ show }) => {
  const [genres, setGenres] = useState([])
  const [filterGenre, setFilterGenre] = useState(null)
  const [booksPerGenre, setBooksPerGenre] = useState(null)
  const [getFilteredBooks, result] = useLazyQuery(ALL_BOOKS, {
    update: (store, response) => {
      const dataInStore = store.readQuery({ query: ALL_BOOKS });
      store.writeQuery({
        query: ALL_BOOKS,
        data: {
          ...dataInStore,
          allBooks: [...response.data.allBooks],
        }
      });
    }
  }) // lazeQuery to use everytime the genre filter changes

  useEffect(() => {
    getFilteredBooks({ variables: { genre: filterGenre } })
  }, [filterGenre, getFilteredBooks])
  
  // Should be refactored to use some "GENRES_LIST" query instead of mannually getting all books
  const books = useQuery(ALL_BOOKS, {
    pollInterval: 2000
  })

  const setGenresCallback = useCallback((g) => {
    setGenres(g)
  }, [])

  const setBooksPerGenreCallback = useCallback((b) => {
    setBooksPerGenre(b)
  }, [])

  useEffect(() => {
    if (result.data) {
      setBooksPerGenreCallback(result.data.allBooks)
    } else if (!books.loading) {
      setBooksPerGenreCallback(books.data.allBooks)
    }
  }, [books, result.data, setBooksPerGenreCallback])

  // List of genres for buttons
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
    getFilteredBooks({variables: { genre: filterGenre }})
  }

  const filteredBooks = () => {
    if (!booksPerGenre) {
      return null
    }

    return (
      booksPerGenre.map(a =>
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