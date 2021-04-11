import React, { useState } from "react";

const Statistics = ({good, neutral, bad}) => {

  const all = () => good + neutral + bad;
  const average = () => {
    let goodFactor = good * 1;
    let badFactor = bad * -1;
    return all() === 0 ? 0 : ((goodFactor + badFactor) / all());
  };

  if(all() === 0) { 
    return (
      <div>
        <h1>Statistics</h1>
        <p>No feedback yet</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Statistics</h1>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>All: {all()}</p>
      <p>Average: {average()}</p>
      <p>Positive: {(good / all() * 100)}%</p>
    </div>
  );
}

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give Feeback</h1>
      <button onClick={() => setGood(good + 1)}>Good</button>
      <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
      <button onClick={() => setBad(bad + 1)}>Bad</button>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
}

export default App;
