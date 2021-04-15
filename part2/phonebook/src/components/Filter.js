const Filter = ({filter, handleFilterChange}) => {
  return (
    <div>
      Filter by: <input value={filter} onChange={handleFilterChange} />
    </div>
  )
}

export default Filter;
