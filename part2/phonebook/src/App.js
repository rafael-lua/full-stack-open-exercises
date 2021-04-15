import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', phone: '1-123-1234567' }
  ]); 
  const [ newName, setNewName ] = useState('');
  const [ newPhone, setNewPhone ] = useState('');

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setNewPhone(e.target.value);
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
      <h2>Phonebook</h2>
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
        {persons.map((value) => <li key={value.name}>{value.name} {value.phone}</li>)}
      </ul>
    </div>
  )
}

export default App;