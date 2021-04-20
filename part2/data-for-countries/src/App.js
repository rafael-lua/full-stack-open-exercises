import { useState, useEffect } from "react";

import axios from 'axios';

import Search from "./components/Search";
import Results from "./components/Results";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setResults(response.data);
      })
  };
  
  useEffect(hook, []);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  }

  const filteredResults = () => {
    return query !== "" ? results.filter((value) => value.name.toUpperCase().includes(query.toUpperCase())) : results;
  }

  const showCountry = (name) => {
    setQuery(name);
  }

  return (
    <div>
      <Search query={query} handleQueryChange={handleQueryChange} />
      {
        filteredResults().length > 10 
        ? <p>Too many results, specify more...</p>
        : <Results results={filteredResults()} showCountry={showCountry} />
      }
    </div>
  );
}

export default App;
