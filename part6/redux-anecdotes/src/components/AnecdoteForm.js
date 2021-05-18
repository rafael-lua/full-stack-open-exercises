import React from "react"
import { useDispatch } from "react-redux"
import { createAnecdote, sortAnecdotes } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const create = (e) => {
    e.preventDefault()

    dispatch(createAnecdote(e.target.anecdote.value))
    dispatch(sortAnecdotes())
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
