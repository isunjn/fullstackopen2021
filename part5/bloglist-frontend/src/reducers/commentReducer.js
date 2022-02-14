import commentService from "../services/comment";
import { setNotification } from "./notificationReducer";

const commentReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_COMMENT_ALL":
    case "GET_COMMENT_ONE":
      return [...state, ...action.data];
    case "CREATE_COMMENT":
      return [...state, action.data];
    default:
      return state;
  }
};

export const getAllComments = () => {
  return async (dispatch) => {
    try {
      const comments = await commentService.getAll();
      dispatch({
        type: "GET_COMMENT_ALL",
        data: comments,
      });
    } catch (error) {
      dispatch(setNotification("error", `${error.response.data.error}`));
    }
  };
};

export const getOneComments = (id) => {
  return async (dispatch) => {
    try {
      const comments = await commentService.getOne(id);
      dispatch({
        type: "GET_COMMENT_ONE",
        data: comments,
      });
    } catch (error) {
      dispatch(setNotification("error", `${error.response.data.error}`));
    }
  };
};

export const createNewComment = (comment) => {
  return async (dispatch) => {
    try {
      const savedComment = await commentService.create(comment);
      dispatch({
        type: "CREATE_COMMENT",
        data: savedComment,
      });
    } catch (error) {
      dispatch(setNotification("error", `${error.response.data.error}`));
    }
  };
};


export default commentReducer;
