import React, { useState, useCallback } from 'react'
import {useApolloClient} from '@apollo/client'

import Login from './components/Login'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')

  const client = useApolloClient()

  const setTokenCallback = useCallback((t) => {
    setToken(t)
    setPage('authors')
  }, [])

  const logout = () => {
    setToken(null)
    localStorage.removeItem("authenticationToken")
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {
          token
            ? <button onClick={() => logout()}>logout</button>
            : <button onClick={() => setPage('login')}>login</button>
        }
        {
          token
            ? <button onClick={() => setPage('add')}>add book</button>
            : null
        }
      </div>

      <Authors
        token={token}
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <Login
        setToken={setTokenCallback}
        show={page === 'login'}
      />

    </div>
  )
}

export default App