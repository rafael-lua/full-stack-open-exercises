const List = ({persons, filter, handleDelete}) => {
  return (
    <ul>
      {
        filter.length === 0
        ? persons.map((value) => (
          <li key={value.id}>
            {value.name} {value.number} <button onClick={() => handleDelete(value.id)}>Delete</button>
          </li>
        ))
        : persons.filter((value) => value.name.toUpperCase().includes(filter.toUpperCase())).map((value) => (
          <li key={value.id}>
            {value.name} {value.number} <button onClick={() => handleDelete(value.id)}>Delete</button>
          </li>
        ))
      }
    </ul>
  )
}

export default List;
