import userService from "../services/users";
import { setNotification } from "./notificationReducer";

const userReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_ALL_USERS":
      return action.data;
    default:
      return state;
  }
};

export const getAllUsers = () => {
  return async (dispatch) => {
    try {
      const user = await userService.getAll();
      dispatch({
        type: "GET_ALL_USERS",
        data: user,
      });
    } catch (error) {
      dispatch(setNotification("error", `${error.response.data.error}`));
    }
  };
};


export default userReducer;
