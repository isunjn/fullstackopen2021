import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import { getAllBlogs } from "../reducers/blogReducer";
import HyperLink from "./style/HyperLink";

const BlogView = () => {
  const dispatch = useDispatch();

  const blogs = useSelector((state) =>
    state.blogs.sort((a, b) => b.likes - a.likes)
  );

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(getAllBlogs());
  }, []);

  return (
    <div>
        <h2>Blogs</h2>
        <Togglable buttonLabel="New blog" ref={blogFormRef}>
          <BlogForm />
        </Togglable>
        <ul>
          {blogs.map((blog) => (
            <li key={blog.id}>
              <HyperLink to={`/blogs/${blog.id}`}>{blog.title}</HyperLink>
            </li>
          ))}
        </ul>
      </div>
  );
};

export default BlogView;
