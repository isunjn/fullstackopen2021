import { initialState, asObject } from "../store"

const reducer = (state = initialState.anecdotes, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  
  if (action.type === 'VOTE') {
    const target = state.find(a => a.id === action.data.id)
    const newObj = { ...target, votes: target.votes + 1 }
    return state.map(s => s.id !== action.data.id ? s : newObj)
  }

  if (action.type === 'CREATE') {
    return [...state, asObject(action.data.content)]
  }

  return state
}

export const addVote = (id) => {
  return {
    type: 'VOTE',
    data: {
      id
    }
  }
}

export const createNew = (content)  => {
  return {
    type: 'CREATE',
    data: {
      content
    }
  }
}

export default reducer