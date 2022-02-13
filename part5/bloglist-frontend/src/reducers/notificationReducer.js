const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_NOTI":
      return action.data;
    case "CLEAR_NOTI":
      return null;
    default:
      return state;
  }
};

let timeOutID = null; // ¯\_(ツ)_/¯

export const setNotification = (type, message) => {
  return async (dispatch) => {
    clearTimeout(timeOutID);
    dispatch({
      type: "SET_NOTI",
      data: {
        type,
        message,
      }
    });
    timeOutID = setTimeout(() => dispatch(clearNotificatin()), 5000);
  };
};

export const clearNotificatin = () => {
  return {
    type: "CLEAR_NOTI",
  };
};

export default notificationReducer;
