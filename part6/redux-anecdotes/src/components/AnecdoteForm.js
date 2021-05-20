import React from "react"
// import { useDispatch } from "react-redux"
import { connect } from "react-redux"
import { createAnecdote, sortAnecdotes } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

// import anecdotesService from "../services/anecdotes"

const AnecdoteForm = (props) => {
  // const dispatch = useDispatch()

  const create = async (e) => {
    e.preventDefault()

    // const newAnec = await anecdotesService.create(e.target.anecdote.value)
    props.createAnecdote(e.target.anecdote.value)
    props.sortAnecdotes()
    const notifMsg = `Created the anecdote: ${e.target.anecdote.value}`
    props.setNotification(notifMsg, 5)
    // setTimeout(() => dispatch(removeNotification(notifMsg)), 5000)
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

const mapDispatchToProps = {
  setNotification,
  createAnecdote,
  sortAnecdotes
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)

export default ConnectedAnecdoteForm
