import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Togglable from "./Togglable";
import CommentForm from "./CommentForm";

import Button from "./style/Button";

import { updateBlog, deleteBlog } from "../reducers/blogReducer";
import { getOneComments } from "../reducers/commentReducer";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  useEffect(() => {
    dispatch(getOneComments(blog.id));
  }, []);

  const comments = useSelector((state) => {
    console.log("state.comments: ", state.comments);
    return state.comments.filter((c) => c.blogid === blog.id);
  }
  );

  console.log(comments);

  const addLike = () => {
    dispatch(
      updateBlog({
        ...blog,
        likes: blog.likes + 1,
      })
    );
  };

  const remove = () => {
    dispatch(deleteBlog(blog.id));
    navigate("/blogs");
  };

  return (
    <div style={blogStyle} className="oneBlog">
      <p>{blog.title}</p>
      <p className="url">{blog.url}</p>
      <p className="likes">
        {blog.likes}
        <Button onClick={addLike} className="likeBtn">
          like
        </Button>
      </p>
      <p>{blog.author}</p>
      <Button onClick={remove}>remove</Button>

      <Togglable buttonLabel="New comment" >
          <CommentForm blogid={blog.id}/>
      </Togglable>

      <div>comments:</div>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
