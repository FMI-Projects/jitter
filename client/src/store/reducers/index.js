import { combineReducers } from "redux-immutable";
import { reducer as formReducer } from "redux-form/immutable";
import authReducer from "../reducers/authReducer";
import postReducer from "../reducers/postReducer";
import userProfileReducer from "./userProfileReducer";
import userProfileModalReducer from "./userProfileModalReducer";
import profileReducer from "./profileReducer";
import onlineFriendsReducer from "./onlineFriendsReducer";

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  userProfile: userProfileReducer,
  userProfileModal: userProfileModalReducer,
  profile: profileReducer,
  posts: postReducer,
  onlineFriends: onlineFriendsReducer
});

export default rootReducer;
