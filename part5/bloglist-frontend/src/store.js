import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import blogReducer from "./reducers/blogReducer";
import loginReducer from "./reducers/loginReducer";
import userReducer from "./reducers/userReducer";
import notificationReducer from "./reducers/notificationReducer";
import commentReducer from "./reducers/commentReducer";

const reducer = combineReducers({
  blogs: blogReducer,
  loggedUser: loginReducer,
  users: userReducer,
  notification: notificationReducer,
  comments: commentReducer
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
