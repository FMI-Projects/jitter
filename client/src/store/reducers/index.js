import {combineReducers} from "redux";
import {reducer as formReducer} from "redux-form";
import authReducer from "../reducers/authReducer";
import profileReducer from "./profileReducer";

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  profile: profileReducer
});

export default rootReducer;
