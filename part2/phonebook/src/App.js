import React, { useState, useEffect } from 'react';

import phoneService from "./services/phones";

import List from "./components/List";
import Filter from "./components/Filter";
import Add from "./components/Add";
import Notification from "./components/Notification";


const App = () => {
  const [ persons, setPersons ] = useState([]); 
  const [ filter, setFilter ] = useState('');
  const [ newName, setNewName ] = useState('');
  const [ newPhone, setNewPhone ] = useState('');
  const [ notification, setNotification ] = useState(null);
  const [ notificationType, setNotificationType ] = useState(null);

  const personsHook = () => {
    phoneService
      .getAll()
      .then(initialValues => {
        setPersons(initialValues);
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
    if(persons.filter((value) => value.name.toUpperCase() === newName.toUpperCase()).length === 0) {
      let newPerson = {
        name: newName,
        number: newPhone
      };

      phoneService
        .create(newPerson)
        .then((newEntry) => {
          setNotification(
            `New entry ${newEntry.name} was created!`
          );
          setNotificationType(
            "success"
          );
          setTimeout(() => {
            setNotification(null);
            setNotificationType(null);
          }, 5000);
          setPersons([...persons, newEntry]);
        });
    } else {
      const result = window.confirm(`${newName} is already on the list! Do you want to update its phone number?`);
      if(result === true) {
        let personId = persons.find((value) => value.name.toUpperCase() === newName.toUpperCase()).id;
        updatePerson(personId);
      }
    }
  }

  const handleDelete = (id) => {
    let personName = persons.find((p) => p.id === id).name;
    const result = window.confirm(`Are you sure you want to remove: ${personName}`);
    if(result === true) {
      phoneService
        .remove(id)
        .then(() => {
          setNotification(
            `Entry ${personName} was removed.`
          );
          setNotificationType(
            "success"
          );
          setTimeout(() => {
            setNotification(null);
            setNotificationType(null);
          }, 5000);
          setPersons(persons.filter((p) => p.id !== id));
        })
    }
  }

  const updatePerson = (id) => {
    let updatedPerson = {...persons.find((p) => p.id === id), number: newPhone};
    console.log(updatedPerson);

    phoneService
      .update(id, updatedPerson)
      .then((newEntry) => {
        setNotification(
          `Number of ${newEntry.name} was updated!`
        );
        setNotificationType(
          "success"
        );
        setTimeout(() => {
          setNotification(null);
          setNotificationType(null);
        }, 5000);
        setPersons(persons.map((p) => p.id === newEntry.id ? newEntry : p));
      });
  }

  return (
    <div>
      <h1>Phonebook</h1>

      <Notification message={notification} type={notificationType} />

      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h2>Add New</h2>

      <Add newName={newName} newPhone={newPhone} handlePhoneChange={handlePhoneChange} handleNameChange={handleNameChange} addPerson={addPerson} />

      <h2>Numbers</h2>

      <List persons={persons} filter={filter} handleDelete={handleDelete} />

    </div>
  )
}

export default App;