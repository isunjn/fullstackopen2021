import React from 'react'
// import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { createNew } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
/*   const dispatch = useDispatch()

  const create = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    dispatch(createNew(content))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  ) */

  const create = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    props.createNew(content)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  createNew
}

const ConnectAnecdoteForm = connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)

export default ConnectAnecdoteForm