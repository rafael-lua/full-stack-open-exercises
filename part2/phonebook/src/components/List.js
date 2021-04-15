const List = ({persons, filter}) => {
  return (
    <ul>
      {
        filter.length === 0
        ? persons.map((value) => <li key={value.name}>{value.name} {value.phone}</li>)
        : persons.filter((value) => value.name.toUpperCase().includes(filter.toUpperCase())).map((value) => <li key={value.name}>{value.name} {value.phone}</li>)
      }
    </ul>
  )
}

export default List;
