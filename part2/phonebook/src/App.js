import React, { useState, useEffect } from 'react'
import axios from 'axios'

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

const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map(person =>
        <p key={person.name}>{person.name} {person.number}</p>
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
    axios.get('http://localhost:3001/persons')
      .then(resp => {
        setPersons(resp.data);
      });
  }, [])


  const shownPersons = searchWord.trim() === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().search(searchWord.toLowerCase().trim()) >= 0);

  const handleAdd = (e) => {
    e.preventDefault();
    persons.forEach(person => {
      if (person.name === newName) {
        alert(`${newName} is already added to phonebook`);
        return;
      }
    });
    const newPerson = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(newPerson));
    setNewName('');
    setNewNumber('');
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
      <Persons persons={shownPersons} />
    </div>
  )
}

export default App