import React, { useState } from "react";

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  );
};

const Statistic = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({good, neutral, bad}) => {

  const all = () => good + neutral + bad;
  const average = () => {
    let goodFactor = good * 1;
    let badFactor = bad * -1;
    return all() === 0 ? 0 : ((goodFactor + badFactor) / all());
  };
  const positive = () => (good / all() * 100) + "%";

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
      <table>
        <tbody>
          <Statistic text="Good" value={good} />
          <Statistic text="Neutral" value={neutral} />
          <Statistic text="Bad" value={bad} />
          <Statistic text="All" value={all()} />
          <Statistic text="Average" value={average()} />
          <Statistic text="Positive" value={positive()} />
        </tbody>
      </table>
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
      <Button handleClick={() => setGood(good + 1)} text="Good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="Bad" />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
}

export default App;
