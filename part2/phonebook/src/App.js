import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', phone: '1-123-1234567' },
    { name: 'Edron Arthur', phone: '1-565-416879' },
    { name: 'Lucy Millena', phone: '1-5489-564469' },
    { name: 'George Jr', phone: '1-1213-21668' },
  ]); 
  const [ filter, setFilter ] = useState('');
  const [ newName, setNewName ] = useState('');
  const [ newPhone, setNewPhone ] = useState('');

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setNewPhone(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const addPerson = (e) => {
    e.preventDefault();
    if(persons.filter((value) => value.name === newName).length === 0) {
      let newPerson = {
        name: newName,
        phone: newPhone
      };
      setPersons([...persons, newPerson]);
    } else {
      window.alert(`${newName} is already on the list!`);
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        Filter by: <input value={filter} onChange={handleFilterChange} />
      </div>
      <h2>Add New</h2>
      <form>
        <div>
          New Name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          Number: <input value={newPhone} onChange={handlePhoneChange} />
        </div>
        <div>
          <button type="submit" onClick={addPerson}>Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {
          filter.length === 0
          ? persons.map((value) => <li key={value.name}>{value.name} {value.phone}</li>)
          : persons.filter((value) => value.name.toUpperCase().includes(filter.toUpperCase())).map((value) => <li key={value.name}>{value.name} {value.phone}</li>)
        }
      </ul>
    </div>
  )
}

export default App;