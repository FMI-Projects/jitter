import {combineReducers} from "redux";
import {reducer as formReducer} from "redux-form";
import authReducer from "../reducers/authReducer";
import profileReducer from "./profileReducer";
import profileModalReducer from "./profileModalReducer";
import postsReducer from "./postsReducer";

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  profile: profileReducer,
  profileModal: profileModalReducer,
  posts: postsReducer
});

export default rootReducer;
