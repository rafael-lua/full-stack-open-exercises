import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]); 
  const [ newName, setNewName ] = useState('');

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const addName = (e) => {
    e.preventDefault();
    if(persons.filter((value) => value.name === newName).length === 0) {
      let newNameObject = {
        name: newName
      };
      setPersons([...persons, newNameObject]);
    } else {
      window.alert(`${newName} is already on the list!`);
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          New Name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit" onClick={addName}>Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((value) => <li key={value.name}>{value.name}</li>)}
      </ul>
    </div>
  )
}

export default App;