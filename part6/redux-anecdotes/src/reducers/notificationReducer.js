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

export const setNotification = (message, lastTime) =>  {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      message
    })
    setTimeout(() => dispatch(clearNotificatin()), lastTime * 1000)
  }
}

export const clearNotificatin = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}

export default notificationReducer
