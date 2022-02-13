import loginService from "../services/login";
import blogService from "../services/blogs";

import { setNotification } from "./notificationReducer";

const userReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_USER":
      return action.data;
    case "LOGIN_USER":
      return action.data;
    case "LOGOUT_USER":
      return null;
    default:
      return state;
  }
};

export const setUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      dispatch({
        type: "SET_USER",
        data: user,
      });
    }
  };
};

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch({
        type: "LOGIN_USER",
        data: user,
      });
    } catch (error) {
      dispatch(setNotification("error", `${error.response.data.error}`));
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem("loggedUser");
    blogService.setToken(null);
    dispatch({
      type: "LOGOUT_USER",
    });
  };
};

export default userReducer;
