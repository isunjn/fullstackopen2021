import { initialState } from "../store"

const notificationReducer = (state = initialState.message, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.message
    case 'CLEAR_NOTIFICATION':
      return ''
    default:
      return state
  }
}

export const setNotification = (message) =>  {
  return {
    type: 'SET_NOTIFICATION',
    message
  }
}

export const clearNotificatin = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}

export default notificationReducer
