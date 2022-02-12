import anecdoteService from "../services/anecdotes"

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  
  if (action.type === 'VOTE') {
    return state.map(a => a.id !== action.data.id ? a : action.data)
  }

  if (action.type === 'CREATE') {
    return [...state, action.data]
  }

  if (action.type === 'INIT') {
    return action.data
  }

  return state
}

export const addVote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    const updatedAnecdote = await anecdoteService.update(newAnecdote)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })
  }
}

export const createNew = (content)  => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    })
  }
}

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}

export default reducer