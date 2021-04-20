const Search = ({query, handleQueryChange}) => {
  return (
    <div>
      Search a country<br />
      <input value={query} onChange={handleQueryChange} />
      <hr />
    </div>
  )
}

export default Search;
