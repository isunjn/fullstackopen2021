import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Notification from "./Notification";
import Blog from "./Blog";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import { logout } from "../reducers/userReducer";
import { getAllBlogs } from "../reducers/blogReducer";

const BlogView = () => {
  const dispatch = useDispatch();

  const name = useSelector((state) => state.user.name);
  const blogs = useSelector((state) =>
    state.blogs.sort((a, b) => b.likes - a.likes)
  );

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(getAllBlogs());
  }, []);

  return (
    <>
      <Notification />

      <div>
        {name} logged in
        <button onClick={() => dispatch(logout())}>logout</button>
      </div>

      <Togglable buttonLabel="New blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>

      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );
};

export default BlogView;
