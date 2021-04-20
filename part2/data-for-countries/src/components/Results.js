import Country from "./Country";

const Results = ({results}) => {
  if(results.length === 0) {
    return <div>No results found with current filter.</div>
  }else if(results.length === 1) {
    return <Country data={results[0]} />
  };

  return (
    <ul>
      {results.map((value) => <li key={value.name}>{value.name}</li>)}
    </ul>
  )
}

export default Results;
