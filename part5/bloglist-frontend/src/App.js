import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link, Navigate, useMatch, useNavigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Blog from "./components/Blog";
import BlogView from "./components/BlogView";
import User from "./components/User";
import UserView from "./components/UserView";
import Notification from "./components/Notification";

import Button from "./components/style/Button";
import Container from "./components/style/Container";

import { logout } from "./reducers/loginReducer";
import { setLoggedUser } from "./reducers/loginReducer";
import HyperLink from "./components/style/HyperLink";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loggedUser = useSelector((state) => state.loggedUser);
  const users = useSelector((state) => state.users);
  const blogs = useSelector((state) => state.blogs);

  let match = useMatch("/blogs/:id");
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null;

  match = useMatch("/users/:id");
  const user = match ? users.find((user) => user.id === match.params.id) : null;

  useEffect(() => {
    dispatch(setLoggedUser());
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const menu = () => (
    <>
      <div>
        <HyperLink to="/blogs">Blogs</HyperLink>
        <HyperLink to="/users">Users</HyperLink>
        {loggedUser ? (
          <em>
            {loggedUser.name} logged in{" "}
            <Button onClick={handleLogout}>logout</Button>
          </em>
        ) : (
          <Link to="/login">login</Link>
        )}
      </div>
    </>
  );

  return (
    <Container>
      <h1>Blog App</h1>
      {loggedUser && menu()}
      <Notification />
      <Routes>
        <Route path="/blogs/:id" element={<Blog blog={blog} />} />
        <Route path="/blogs" element={<BlogView />} />
        <Route path="/users/:id" element={<User user={user} />} />
        <Route
          path="/users"
          element={loggedUser ? <UserView /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/login"
          element={!loggedUser ? <LoginForm /> : <Navigate replace to="/" />}
        />
        <Route
          path="/"
          element={loggedUser ? <p>Welcome!</p> : <Navigate replace to="/login" />}
        />
      </Routes>
    </Container>
  );
};

export default App;
