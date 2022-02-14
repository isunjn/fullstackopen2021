import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HyperLink from "./style/HyperLink";
import { getAllUsers } from "../reducers/userReducer";

const UserView = () => {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <HyperLink to={`/users/${user.id}`}>{user.name}</HyperLink>
            <em> - {user.blogs.length} blogs created</em>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserView;
