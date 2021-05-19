const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  // console.log("state now: ", state)
  // console.log("action", action)

  switch (action.type) {
    case "VOTE": {
      const newState = [...state].map((anecdote) => {
        if (anecdote.id !== action.data) {
          return anecdote
        } else {
          anecdote.votes += 1
          return anecdote
        }
      })
      return newState
    }

    case "CREATE": {
      const newAnecdote = {
        content: action.data,
        id: getId(),
        votes: 0
      }
      return [...state, newAnecdote]
    }

    case "SORT": {
      const newState = [...state].sort(anecdotesSort)
      return newState
    }

    default:
      return state
  }
}

export const voteAnecdote = (id) => {
  return {
    type: "VOTE",
    data: id
  }
}

export const createAnecdote = (content) => {
  return {
    type: "CREATE",
    data: content
  }
}

const anecdotesSort = (a, b) => {
  return a.votes > b.votes
    ? -1
    : a.votes < b.votes
      ? 1
      : 0
}

export const sortAnecdotes = () => {
  return {
    type: "SORT"
  }
}

export default reducer