import { combineReducers } from "redux";
import articles from "./reducers/article.reducers";
import authUser from "./reducers/authUser.reducers";
import common from "./reducers/common.reducers";
import { connectRouter } from "connected-react-router";

export default history =>
  combineReducers({
    articles,
    authUser,
    common,
    router: connectRouter(history)
  });
