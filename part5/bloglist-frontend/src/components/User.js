import React from "react";

const User = ({ user }) => {

  return (
    <div className="oneUser">
      <p>{user.name}</p>
      <p>added blogs:</p>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
