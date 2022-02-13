import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import LoginForm from "./components/LoginForm";
import BlogView from "./components/BlogView";

import { setUser } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(setUser());
  }, []);

  return (
    <div>
      {user === null && <LoginForm />}
      {user !== null && <BlogView />}
    </div>
  );
};

export default App;
