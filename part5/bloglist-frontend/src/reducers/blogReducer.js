import blogService from "../services/blogs";
import { setNotification } from "./notificationReducer";

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_ALL_BLOG":
      return action.data;
    case "CREATE_BLOG":
      return [...state, action.data];
    case "UPDATE_BLOG":
      return state.map((b) => (b.id !== action.data.id ? b : action.data));
    case "DELETE_BLOG":
      return state.filter((b) => b.id !== action.data);
    default:
      return state;
  }
};

export const getAllBlogs = () => {
  return async (dispatch) => {
    try {
      const blogs = await blogService.getAll();
      dispatch({
        type: "GET_ALL_BLOG",
        data: blogs,
      });
    } catch (error) {
      dispatch(setNotification("error", `${error.response.data.error}`));
    }
  };
};

export const createNewBlog = (blog) => {
  return async (dispatch) => {
    try {
      const savedBlog = await blogService.create(blog);
      dispatch({
        type: "CREATE_BLOG",
        data: savedBlog,
      });
      dispatch(
        setNotification(
          "notify",
          `A new blog added: ${savedBlog.title} by ${savedBlog.author}`
        )
      );
    } catch (error) {
      dispatch(setNotification("error", `${error.response.data.error}`));
    }
  };
};

export const updateBlog = (blog) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.update(blog);
      dispatch({
        type: "UPDATE_BLOG",
        data: updatedBlog,
      });
    } catch (error) {
      dispatch(setNotification("error", `${error.response.data.error}`));
    }
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogService.deleteOne(id);
      dispatch({
        type: "DELETE_BLOG",
        data: id,
      });
    } catch (error) {
      dispatch(setNotification("error", `${error.response.data.error}`));
    }
  };
};

export default blogReducer;
