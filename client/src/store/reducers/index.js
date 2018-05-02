import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-forms";

const rootReducer = combineReducers({
    form: formReducer
});

export default rootReducer;
