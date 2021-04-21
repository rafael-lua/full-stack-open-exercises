import React, { useState, useEffect } from 'react';
import axios from 'axios';

import List from "./components/List";
import Filter from "./components/Filter";
import Add from "./components/Add";


const App = () => {
  const [ persons, setPersons ] = useState([]); 
  const [ filter, setFilter ] = useState('');
  const [ newName, setNewName ] = useState('');
  const [ newPhone, setNewPhone ] = useState('');

  const personsHook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data);
      })
  };
  
  useEffect(personsHook, []);

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

      axios
        .post("http://localhost:3001/persons", newPerson)
        .then((response) => {
          console.log("New entry created!");
          setPersons([...persons, response.data]);
        });
    } else {
      window.alert(`${newName} is already on the list!`);
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>

      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h2>Add New</h2>

      <Add newName={newName} newPhone={newPhone} handlePhoneChange={handlePhoneChange} handleNameChange={handleNameChange} addPerson={addPerson} />

      <h2>Numbers</h2>

      <List persons={persons} filter={filter} />

    </div>
  )
}

export default App;