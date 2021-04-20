import { useState, useEffect } from "react";
import Search from "./components/Search";
import Results from "./components/Results";
import Country from "./components/Country";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  return (
    <div>
      <Search />
    </div>
  );
}

export default App;
