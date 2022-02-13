import React from "react";
import { useDispatch } from "react-redux";
import { useField } from "../hooks";
import { createNewBlog } from "../reducers/blogReducer";

const BlogForm = () => {
  const dispatch = useDispatch();

  const title = useField("text", "title");
  const author = useField("text", "author");
  const url = useField("text", "url");

  const handleCreateNewBlog = (event) => {
    event.preventDefault();
    dispatch(
      createNewBlog({
        title: title.value,
        author: author.value,
        url: url.value,
      })
    );
  };

  return (
    <>
      <h2>Create New</h2>
      <form onSubmit={handleCreateNewBlog}>
        <label htmlFor="title">
          Title: <input id="title" {...title} />
        </label>
        <label htmlFor="author">
          Author: <input {...author} id="author" />
        </label>
        <label htmlFor="url">
          URL: <input {...url} id="url" />
        </label>
        <button type="submit" id="submitBtn">
          Create
        </button>
      </form>
    </>
  );
};

export default BlogForm;
