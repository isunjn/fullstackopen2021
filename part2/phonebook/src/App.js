import React, { useState, useEffect } from 'react'

import personService from './services/persons';

const Filter = ({ searchWord, handler }) => {
  return (
    <div>
      filter shown with <input value={searchWord} onChange={handler} />
    </div>
  )
}

const PersonForm = ({ newName, newNumber, nameHandler, numberHandler, submitHandler }) => {
  return (

    <form onSubmit={submitHandler}>
      <div>
        name: <input value={newName} onChange={nameHandler} />
      </div>
      <div>
        number: <input value={newNumber} onChange={numberHandler} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ persons, deleteHandler }) => {
  return (
    <div>
      {persons.map(person =>
        <p key={person.id}>{person.name} {person.number} <button onClick={() => deleteHandler(person.id)}>delete</button></p>
      )}
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchWord, setSearchWord] = useState('');

  useEffect(() => {
    console.log('start fetch');
    personService.getAll().then(persons => {
      setPersons(persons);
    });
  }, [])


  const shownPersons = searchWord.trim() === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().search(searchWord.toLowerCase().trim()) >= 0);

  const handleAdd = (e) => {
    e.preventDefault();
    for (const person of persons) {
      if (person.name === newName) {
        if (window.confirm(`${newName} is already added to phonebook, replace with new number ?`)) {
          const newPerson = {
            ...person,
            number: newNumber
          }
          personService.updatePerson(newPerson).then(newPerson => {
            setPersons(persons.map(p => p.name === newName ? newPerson : p));
            setNewName('');
            setNewNumber('');
          })
        }
        return;
      }
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }
    personService.createPerson(newPerson).then(newPerson => {
      setPersons(persons.concat(newPerson));
      setNewName('');
      setNewNumber('');
    });
  }

  const handleDelete = id => {
    if (!window.confirm(`Delete ${id} ?`)) return;
    personService.deletePerson(id).then(() => {
      setPersons(persons.filter(person => person.id !== id ));
    });
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  }

  const handleSearchWordChange = (e) => {
    setSearchWord(e.target.value);
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter searchWord={searchWord} handler={handleSearchWordChange} />
      <h2>Add new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        nameHandler={handleNameChange}
        numberHandler={handleNumberChange}
        submitHandler={handleAdd} />
      <h2>Numbers</h2>
      <Persons persons={shownPersons} deleteHandler={handleDelete} />
    </div>
  )
}

export default App