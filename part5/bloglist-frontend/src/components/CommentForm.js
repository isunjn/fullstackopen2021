import React from "react";
import { useDispatch } from "react-redux";
import { useField } from "../hooks";
import { createNewComment } from "../reducers/commentReducer";
import Button from "./style/Button";

const CommentForm = ({ blogid }) => {
  const dispatch = useDispatch();

  const content = useField("text", "content");

  const handleCreateNewComment = (event) => {
    event.preventDefault();
    dispatch(
      createNewComment({
        content: content.value,
        blogid: blogid,
      })
    );
  };

  return (
    <>
      <h2>Create New Comment</h2>
      <form onSubmit={handleCreateNewComment}>
        <label htmlFor="content">
          content: <input id="content" {...content} />
        </label>
        <Button type="submit">Create</Button>
      </form>
    </>
  );
};

export default CommentForm;
