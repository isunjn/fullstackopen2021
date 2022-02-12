import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotificatin } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(
    state => state.anecdotes
      .filter(a => a.content.toLowerCase().includes(state.filter.toLowerCase()))
      .sort((a, b) => b.votes - a.votes)
  )
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    console.log('vote', anecdote.id)
    dispatch(addVote(anecdote.id))
    dispatch(setNotification(`you voted ${anecdote.content}`))
    setTimeout(() => dispatch(clearNotificatin()), 5000)
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList