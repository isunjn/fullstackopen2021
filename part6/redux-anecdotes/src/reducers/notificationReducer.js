const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.message
    case 'CLEAR_NOTIFICATION':
      return ''
    default:
      return state
  }
}

let timeOutID = null // ¯\_(ツ)_/¯

export const setNotification = (message, time) =>  {
  return async dispatch => {
    clearTimeout(timeOutID)
    dispatch({
      type: 'SET_NOTIFICATION',
      message
    })
    timeOutID = setTimeout(() => dispatch(clearNotificatin()), time * 1000)
  }
}

export const clearNotificatin = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}

export default notificationReducer
