import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { voteAnecdote, sortAnecdotes } from "../reducers/anecdoteReducer"
import { setNotification, removeNotification } from "../reducers/notificationReducer"


const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes)
  const dispatch = useDispatch()


  const vote = (id) => {
    dispatch(voteAnecdote(id))
    dispatch(sortAnecdotes())
    const notifMsg = `Voted the anecdote: ${anecdotes.find((anec) => anec.id === id).content}`
    dispatch(setNotification(notifMsg))
    setTimeout(() => dispatch(removeNotification(notifMsg)), 5000)
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
