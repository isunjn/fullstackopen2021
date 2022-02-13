import React from "react";
import { useDispatch } from "react-redux";
import { useField } from "../hooks";
import Notification from "./Notification";
import { login } from "../reducers/userReducer";

const LoginForm = () => {
  const dispatch = useDispatch();

  const username = useField("text", "username");
  const password = useField("text", "password");

  const handleLogin = async (event) => {
    event.preventDefault();
      dispatch(
        login({
          username: username.value,
          password: password.value,
        })
      );
  };

  return (
    <>
      <h2>Log in to application</h2>
      <Notification />
      <form onSubmit={handleLogin}>
        <label htmlFor="username">
          username: <input id="username" {...username} />
        </label>
        <label htmlFor="password">
          password: <input id="password" {...password} />
        </label>
        <button type="submit" id="login-button">
          login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
