import React, { useState } from 'react'

function App() {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ];
   
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(
    [...Array(anecdotes.length)].map((value) => 0)
  );

  const randomAnecdote = (lastAnec) => {
    let newAnec = Math.floor(Math.random() * anecdotes.length);
    while(newAnec === lastAnec) {
      newAnec = Math.floor(Math.random() * anecdotes.length);
    }
    return newAnec;
  }

  const voteAnecdote = (n) => {
    let newVotes = [...votes];
    newVotes[n] += 1;
    setVotes(newVotes);
  }

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>Amount of votes: {votes[selected]}</p>
      <button onClick={() => {voteAnecdote(selected)}}>Vote</button>
      <button onClick={() => {setSelected(randomAnecdote(selected))}}>Next Anecdote</button>
    </div>
  );
}

export default App;
