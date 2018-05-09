import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "../reducers/authReducer";
import userProfileReducer from "./userProfileReducer";
import userProfileModalReducer from "./userProfileModalReducer";
import profileReducer from "./profileReducer";

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  userProfile: userProfileReducer,
  userProfileModal: userProfileModalReducer,
  profile: profileReducer
});

export default rootReducer;
