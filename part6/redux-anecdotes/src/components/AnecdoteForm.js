import React from "react"
import { useDispatch } from "react-redux"
import { createAnecdote, sortAnecdotes } from "../reducers/anecdoteReducer"
import { setNotification, removeNotification } from "../reducers/notificationReducer"

import anecdotesService from "../services/anecdotes"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const create = async (e) => {
    e.preventDefault()

    const newAnec = await anecdotesService.create(e.target.anecdote.value)
    dispatch(createAnecdote(newAnec))
    dispatch(sortAnecdotes())
    const notifMsg = `Created the anecdote: ${newAnec.content}`
    dispatch(setNotification(notifMsg))
    setTimeout(() => dispatch(removeNotification(notifMsg)), 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={create} >
        <div><input name="anecdote" /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
