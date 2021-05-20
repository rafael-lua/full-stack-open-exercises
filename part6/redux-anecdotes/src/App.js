import React, { useEffect } from "react"
import { useDispatch } from "react-redux"

import anecdotesService from "./services/anecdotes"

import { initializeAnecdotes } from "./reducers/anecdoteReducer"

import AnecdoteForm from "./components/AnecdoteForm"
import AnecdoteList from "./components/AnecdoteList"
import Notification from "./components/Notification"
import FilterAnecdotes from "./components/FilterAnecdotes"

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    anecdotesService
      .getAll()
      .then((data) => {
        dispatch(initializeAnecdotes(data))
      })
  }, [dispatch])

  return (
    <div>
      <FilterAnecdotes />
      <Notification />
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App