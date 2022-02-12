import { initialState } from "../store"

const filterReducer = (state = initialState.filter, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.filter
    case 'CLEAR_FILTER':
      return ''
    default:
      return state
  }
}

export const setFilter = (filter) => {
  return {
    type: 'SET_FILTER',
    filter
  }
}

export const clearFilter = () => {
  return {
    type: 'CLEAR_FILTER'
  }
}

export default filterReducer